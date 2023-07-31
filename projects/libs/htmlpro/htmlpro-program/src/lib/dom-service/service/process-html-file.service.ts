import { singleton } from "tsyringe";
import { EMPTY_STRING } from "@lib/const";
import { Parser } from "htmlparser2";
import { HtmlProDomainStoreService } from "@lib/htmlpro-workspace";
import { FileUtilsService } from "@lib/utils";
import { HtmlAttributesEnum } from "../../enum/html-attributes.enum";

@singleton()
/**
 * The service is responsible for process html file.
 */
export class ProcessHtmlFileService {
  constructor(
    private readonly htmlProDomainStore: HtmlProDomainStoreService,
    private readonly fileUtils: FileUtilsService
  ) {
  }

  process(
    inputPath: string,
    attributes: Array<{ key: string, value: string }>
  ): string {
    const htmlFileContent = this.preBuildHtmlContent(
      inputPath, attributes
    );
    let htmlContentResult: string = EMPTY_STRING;
    let dataImport: string = EMPTY_STRING;
    const parser = new Parser({
      onopentag: (
        name: string,
        attribs: { [s: string]: string; }
      ): void => {
        dataImport = attribs[HtmlAttributesEnum.dataImport] ??
          EMPTY_STRING;
        if (dataImport === EMPTY_STRING) {
          htmlContentResult += `<${name}`;
          for (const attr in attribs) {
            htmlContentResult += ` ${attr}="${attribs[attr]}"`;
          }
          htmlContentResult += ">";
          return;
        }
        const component = this.htmlProDomainStore.getComponent(
          dataImport
        );
        const attribsArray = Object.keys(attribs)
          .map(attribKey => ({
            key: attribKey,
            value: attribs[attribKey]
          }))
        htmlContentResult += this.process(
          component.templateUrl, attribsArray
        );
      },
      ontext: (text: string): void => {
        if (dataImport === EMPTY_STRING) {
          htmlContentResult += text;
        }
      },
      onclosetag: (name: string): void => {
        if (dataImport === EMPTY_STRING) {
          htmlContentResult += `</${name}>`;
          return;
        }
        dataImport = EMPTY_STRING;
      }
    });
    parser.write(htmlFileContent);
    parser.end();
    return htmlContentResult;
  }

  private preBuildHtmlContent(
    inputPath: string,
    attributes: Array<{ key: string, value: string }>
  ): string {
    let htmlFileContent = this.fileUtils.readTextFile(inputPath);
    attributes
      .map(attribute => ({
        key: `{{${attribute.key}}`, value: attribute.value
      }))
      .forEach(attribute => {
        htmlFileContent.replaceAll(attribute.key, attribute.value)
      });
    return htmlFileContent;
  }
}
