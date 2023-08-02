import { singleton } from "tsyringe";
import { FileUtilsService, PathUtilsService } from "@lib/utils";
import {
  ProcessHtmlFileService
} from "../dom-service/service/process-html-file.service";
import {
  ProcessCssFileService
} from "../dom-service/service/process-css-file.service";
import {
  GetHtmlDependenciesService
} from "../dom-service/service/get-html-dependencies.service";

@singleton()
/**
 * The app service is responsible for build html file.
 */
export class BuildHtmlAppService {
  constructor(
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
    allHtmlResults.forEach(htmlResult => this.fileUtils.writeTextFile(
      htmlResult.htmlFileOutput, htmlResult.htmlFileOutput
    ));
    return true;
  }
}
