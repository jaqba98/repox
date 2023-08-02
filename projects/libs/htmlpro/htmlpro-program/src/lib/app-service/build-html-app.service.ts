import { singleton } from "tsyringe";
import {
  FileUtilsService,
  FolderUtilsService,
  PathUtilsService
} from "@lib/utils";
import {
  ProcessHtmlFileService
} from "../dom-service/service/process-html-file.service";
import {
  ProcessCssFileService
} from "../dom-service/service/process-css-file.service";
import {
  GetHtmlDependenciesService
} from "../dom-service/service/get-html-dependencies.service";
import { NEW_LINE } from "@lib/const";

@singleton()
/**
 * The app service is responsible for build html file.
 */
export class BuildHtmlAppService {
  constructor(
    private readonly folderUtils: FolderUtilsService,
    private readonly fileUtils: FileUtilsService,
    private readonly processHtmlFile: ProcessHtmlFileService,
    private readonly getHtmlDependencies: GetHtmlDependenciesService,
    private readonly processCssFile: ProcessCssFileService,
    private readonly pathUtils: PathUtilsService
  ) {
  }

  run(
    inputPath: string, outputPath: string
  ): boolean {
    this.folderUtils.createFolder(outputPath);
    const allHtmlFiles = this.fileUtils.readAllHtmlFiles(inputPath);
    const allHtmlResults = allHtmlFiles
      .map(htmlFilePath => ({
        htmlFilePath,
        htmlFileResult: this.processHtmlFile.process(htmlFilePath, []),
        htmlFileDependencies: this.getHtmlDependencies.getDependencies(
          htmlFilePath
        ),
        htmlFileName: this.fileUtils.getFileName(htmlFilePath)
      }))
      .map(htmlFile => ({
        ...htmlFile,
        htmlFileOutput: this.pathUtils.createPath(
          [outputPath, htmlFile.htmlFileName]
        )
      }));
    const allCssResults = allHtmlResults
      .map(htmlResult => htmlResult.htmlFileDependencies)
      .flat()
      .reduce((acc: Array<string>, curr: string): Array<string> =>
        acc.includes(curr) ? acc : [...acc, curr], [])
      .map(alias => this.processCssFile.process(alias))
      .join(NEW_LINE);
    allHtmlResults.forEach(htmlResult => this.fileUtils.writeTextFile(
      htmlResult.htmlFileOutput, htmlResult.htmlFileResult
    ));
    const cssOutputPath: string = this.pathUtils.createPath([
      outputPath, "style.css"
    ]);
    this.fileUtils.writeTextFile(cssOutputPath, allCssResults);
    return true;
  }
}
