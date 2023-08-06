import { singleton } from "tsyringe";
import { FileUtilsService, FolderUtilsService } from "@lib/utils";
import {
  HtmlJsonParserService
} from "../dom-service/service/html-json-parser.service";
import {
  HtmlToJsonConverterService
} from "../dom-service/converter/html-to-json-converter.service";

@singleton()
/**
 * The app service is responsible for build html file.
 */
export class BuildHtmlAppService {
  constructor(
    private readonly folderUtils: FolderUtilsService,
    private readonly fileUtils: FileUtilsService,
    private readonly htmlConverter: HtmlToJsonConverterService,
    private readonly processHtmlJson: HtmlJsonParserService
  ) {
  }

  run(
    inputPath: string, outputPath: string
  ): boolean {
    this.folderUtils.createFolder(outputPath);
    const result = this.fileUtils.readAllHtmlFiles(inputPath)
      .map(htmlPath => ({ htmlPath }))
      .map(html => ({
        ...html,
        htmlBase: this.fileUtils.readHtmlFile(html.htmlPath)
      }))
      .map(html => ({
        ...html,
        htmlJson: this.htmlConverter.htmlToJson(html.htmlBase)
      }))
      .map(html => ({
        ...html,
        htmlJsonParsed: this.processHtmlJson.parse(html.htmlJson)
      }));
    console.log(result);
    return true;
  }
}
