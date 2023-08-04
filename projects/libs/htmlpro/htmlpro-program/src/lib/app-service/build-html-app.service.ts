import { singleton } from "tsyringe";
import {
  FileUtilsService,
  FolderUtilsService,
  HtmlConverterService
} from "@lib/utils";

@singleton()
/**
 * The app service is responsible for build html file.
 */
export class BuildHtmlAppService {
  constructor (
    private readonly folderUtils: FolderUtilsService,
    private readonly fileUtils: FileUtilsService,
    private readonly htmlConverter: HtmlConverterService
    // private readonly processHtmlFile: ProcessHtmlFileService,
    // private readonly getHtmlDependencies: GetHtmlDependenciesService,
    // private readonly processCssFile: ProcessCssFileService,
    // private readonly pathUtils: PathUtilsService
  ) {
  }

  run (
    inputPath: string, outputPath: string
  ): boolean {
    this.folderUtils.createFolder(outputPath);
    const htmlFiles = this.fileUtils.readAllHtmlFiles(inputPath)
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
      }));
    console.log(htmlFiles);
    // // Build html
    // const allHtmlFiles = this.fileUtils.readAllHtmlFiles(inputPath);
    // const allHtmlResults = allHtmlFiles
    //   .map(htmlFilePath => ({
    //     htmlFilePath,
    //     htmlFileResult: this.processHtmlFile.process(htmlFilePath, []),
    //     htmlFileDependencies: this.getHtmlDependencies.getDependencies(
    //       htmlFilePath
    //     ),
    //     htmlFileName: this.fileUtils.getFileName(htmlFilePath)
    //   }))
    //   .map(htmlFile => ({
    //     ...htmlFile,
    //     htmlFileOutput: this.pathUtils.createPath(
    //       [outputPath, htmlFile.htmlFileName]
    //     )
    //   }));
    // allHtmlResults.forEach(htmlResult => {
    //   this.fileUtils.writeTextFile(
    //     htmlResult.htmlFileOutput, htmlResult.htmlFileResult
    //   );
    // });
    // // Build css
    // const allCssFiles = this.fileUtils.readAllCssFiles(inputPath);
    // const allCssResults = allHtmlResults
    //   .map(htmlResult => htmlResult.htmlFileDependencies)
    //   .flat()
    //   .reduce((acc: string[], curr: string): string[] =>
    //     acc.includes(curr) ? acc : [...acc, curr], [])
    //   .map(alias => this.processCssFile.process(alias))
    //   .join(NEW_LINE);
    // const cssResult = allCssFiles
    //   .map(cssFile => this.fileUtils.readTextFile(cssFile))
    //   .join(NEW_LINE)
    //   .concat(allCssResults);
    // const cssOutputPath: string = this.pathUtils.createPath([
    //   outputPath, "style.css"
    // ]);
    // this.fileUtils.writeTextFile(cssOutputPath, cssResult);
    return true;
  }
}
