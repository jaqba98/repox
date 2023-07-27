import { singleton } from "tsyringe";
import { FileUtilsService } from "@lib/utils";
import { Parser } from "htmlparser2";
import { EMPTY_STRING } from "@lib/const";

@singleton()
/**
 * The app service is responsible for build html file.
 */
export class BuildHtmlAppService {
  constructor(private readonly fileUtils: FileUtilsService) {
  }

  // todo: refactor the method
  run(inputPath: string, outputPath: string): boolean {
    const htmlResultFile = this.processTheHtmlFile(inputPath);
    this.fileUtils.writeTextFile(outputPath, htmlResultFile);
    return true;
  }

  // todo: refactor the method
  private processTheHtmlFile(filePath: string): string {
    const htmlFileContent = this.fileUtils.readTextFile(filePath);
    let htmlFileResult = EMPTY_STRING;
    let currentTag = EMPTY_STRING;
    const parser = new Parser({
      onopentag: (name, attributes) => {
        currentTag = name;
        if (name === "import" && attributes.from !== EMPTY_STRING) {
          htmlFileResult += this.processTheHtmlFile(attributes.from);
        } else {
          htmlFileResult += `<${name}`;
          for (const attr in attributes) {
            htmlFileResult += ` ${attr}="${attributes[attr]}"`;
          }
          htmlFileResult += '>';
        }
      },
      ontext: (text) => {
        if (currentTag !== "import") {
          htmlFileResult += text;
        }
      },
      onclosetag: (name) => {
        if (currentTag !== "import") {
          htmlFileResult += `</${name}>`;
        } else {
          currentTag = "";
        }
      }
    });
    parser.write(htmlFileContent);
    parser.end();
    return htmlFileResult;
  }
}
