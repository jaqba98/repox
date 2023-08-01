import { singleton } from "tsyringe";
import { EMPTY_STRING, NEW_LINE } from "@lib/const";
import { Parser } from "htmlparser2";
import { HtmlAttributesEnum } from "../../enum/html-attributes.enum";
import { FileUtilsService } from "@lib/utils";
import { HtmlProDomainStoreService } from "@lib/htmlpro-workspace";

@singleton()
/**
 * The service is responsible for process css file.
 */
export class ProcessCssFileService {
  constructor(
    private readonly htmlProDomainStore: HtmlProDomainStoreService,
    private readonly fileUtils: FileUtilsService
  ) {
  }

  process(inputPath: string): string {
    let cssFileContent = this.fileUtils.readTextFile(inputPath);
    let cssContentResult: string = EMPTY_STRING;
    const parser = new Parser({
      onopentag: (
        name: string,
        attribs: { [s: string]: string; }
      ): void => {
        const dataImport = attribs[HtmlAttributesEnum.dataImport] ??
          EMPTY_STRING;
        if (dataImport === EMPTY_STRING) {
          return;
        }
        const component = this.htmlProDomainStore.getComponent(
          dataImport
        );
        cssContentResult += component.styleUrls
          .map(url => this.fileUtils.readTextFile(url))
          .join(NEW_LINE);
        this.process(component.templateUrl);
      }
    });
    parser.write(cssFileContent);
    parser.end();
    return cssContentResult;
  }
}
