import { singleton } from "tsyringe";
import {
  FileUtilsService,
  FolderUtilsService,
  HtmlConverterService,
  PathUtilsService
} from "@lib/utils";

@singleton()
/**
 * The app service is responsible for build html file.
 */
export class BuildHtmlAppService {
  constructor(
    private readonly folderUtils: FolderUtilsService,
    private readonly fileUtils: FileUtilsService,
    private readonly htmlConverter: HtmlConverterService,
    private readonly pathUtils: PathUtilsService
  ) {
  }

  run(
    inputPath: string, outputPath: string
  ): boolean {
    this.folderUtils.createFolder(outputPath);
    this.fileUtils.readAllHtmlFiles(inputPath)
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
      }))
      .forEach(html => {
        this.fileUtils.writeTextFile(
          html.htmlFileOutput, html.htmlToSave
        );
      });
    return true;
  }
}
