import { singleton } from "tsyringe";
import {
  FileUtilsService,
  FolderUtilsService,
  HtmlConverterService,
  PathUtilsService
} from "@lib/utils";
import {
  ProcessHtmlJsonService
} from "../dom-service/service/process-html-json.service";

@singleton()
/**
 * The app service is responsible for build html file.
 */
export class BuildHtmlAppService {
  constructor(
    private readonly folderUtils: FolderUtilsService,
    private readonly fileUtils: FileUtilsService,
    private readonly htmlConverter: HtmlConverterService,
    private readonly pathUtils: PathUtilsService,
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
      }))
      .map(html => ({
        ...html,
        htmlToSave: this.htmlConverter.jsonToHtml(html.htmlJson)
      }))
      .map(html => ({
        ...html,
        htmlFileName: this.fileUtils.getFileName(html.htmlPath)
      }))
      .map(html => ({
        ...html,
        htmlFileOutput: this.pathUtils.createPath(
          [outputPath, html.htmlFileName]
        )
      }));
    console.log(result);
    result.forEach(html => {
      this.fileUtils.writeTextFile(
        html.htmlFileOutput, html.htmlToSave
      );
    });
    return true;
  }
}
