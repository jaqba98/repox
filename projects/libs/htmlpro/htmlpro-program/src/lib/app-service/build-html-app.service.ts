import { singleton } from "tsyringe";
import { FileUtilsService, FolderUtilsService } from "@lib/utils";
import {
  ProcessHtmlJsonService
} from "../dom-service/service/process-html-json.service";
import {
  HtmlConverterService
} from "../dom-service/converter/html-converter.service";

@singleton()
/**
 * The app service is responsible for build html file.
 */
export class BuildHtmlAppService {
  constructor(
    private readonly folderUtils: FolderUtilsService,
    private readonly fileUtils: FileUtilsService,
    private readonly htmlConverter: HtmlConverterService,
    private readonly processHtmlJson: ProcessHtmlJsonService
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
        htmlJsonParsed: this.processHtmlJson.process(html.htmlJson)
      }));
    console.log(result);
    return true;
  }
}
