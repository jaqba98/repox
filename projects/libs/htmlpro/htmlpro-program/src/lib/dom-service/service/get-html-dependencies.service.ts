import { singleton } from "tsyringe";
import { HtmlProDomainStoreService } from "@lib/htmlpro-workspace";
import { FileUtilsService } from "@lib/utils";
import { EMPTY_STRING, NEW_LINE } from "@lib/const";
import { Parser } from "htmlparser2";
import { HtmlAttributesEnum } from "../../enum/html-attributes.enum";


@singleton()
/**
 * The service is responsible for process html file.
 */
export class GetHtmlDependenciesService {
  constructor(
    private readonly htmlProDomainStore: HtmlProDomainStoreService,
    private readonly fileUtils: FileUtilsService
  ) {
  }

  getDependencies(inputPath: string): Array<string> {
    const htmlFileContent = this.fileUtils.readTextFile(inputPath);
    let htmlDependencies: Array<string> = [];
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
        htmlDependencies = [...htmlDependencies, component.alias];
        this.getDependencies(component.templateUrl);
      }
    });
    parser.write(htmlFileContent);
    parser.end();
    return htmlDependencies;
  }
}
