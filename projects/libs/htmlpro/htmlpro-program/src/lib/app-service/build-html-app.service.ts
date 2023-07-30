import { singleton } from "tsyringe";
import { FileUtilsService } from "@lib/utils";
import { Parser } from "htmlparser2";
import { EMPTY_STRING } from "@lib/const";
import { HtmlProDomainStoreService } from "@lib/htmlpro-workspace";

@singleton()
/**
 * The app service is responsible for build html file.
 */
export class BuildHtmlAppService {
  constructor(
    private readonly fileUtils: FileUtilsService,
    private readonly htmlProDomainStore: HtmlProDomainStoreService
  ) {
  }

  run(inputPath: string, outputPath: string): boolean {
    const htmlResultFile = this.processTheHtmlFile(inputPath);
    this.fileUtils.writeTextFile(outputPath, htmlResultFile);
    return true;
  }

  // todo: refactor the method
  private processTheHtmlFile(filePath: string): string {
    const htmlProDomain = this.htmlProDomainStore.getHtmlProDomain();
    const htmlFileContent = this.fileUtils.readTextFile(filePath);
    let htmlFileResult = EMPTY_STRING;
    let dataFrom = EMPTY_STRING;
    const parser = new Parser({
      onopentag: (name, attributes): void => {
        dataFrom = attributes["data-from"] ?? EMPTY_STRING;
        if (dataFrom !== EMPTY_STRING) {
          const component = Object.values(htmlProDomain.components)
            .find(component => component.alias === dataFrom)
          if (component === undefined) {
            throw new Error(`Not found ${dataFrom} component`);
          }
          htmlFileResult += this.processTheHtmlFile(
            component.templateUrl
          );
        } else {
          htmlFileResult += `<${name}`;
          for (const attr in attributes) {
            htmlFileResult += ` ${attr}="${attributes[attr]}"`;
          }
          htmlFileResult += ">";
        }
      },
      ontext: (text): void => {
        if (dataFrom === EMPTY_STRING) {
          htmlFileResult += text;
        }
      },
      onclosetag: (name): void => {
        if (dataFrom === EMPTY_STRING) {
          htmlFileResult += `</${name}>`;
        } else {
          dataFrom = EMPTY_STRING;
        }
      }
    });
    parser.write(htmlFileContent);
    parser.end();
    return htmlFileResult;
  }
}
