import { singleton } from "tsyringe";
import { FileUtilsService } from "@lib/utils";
import { XMLParser } from "fast-xml-parser";

@singleton()
/**
 * The app service is responsible for build html file.
 */
export class BuildHtmlAppService {
  constructor(private readonly fileUtils: FileUtilsService) {
  }

  async run(filePath: string): Promise<boolean> {
    const htmlFileContent = this.fileUtils.readTextFile(filePath);
    const parser = new XMLParser();
    const htmlFileJson = parser.parse(htmlFileContent);
    return true;
  }
}
