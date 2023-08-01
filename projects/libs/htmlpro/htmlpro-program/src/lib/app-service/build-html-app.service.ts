import { singleton } from "tsyringe";
import { FileUtilsService, PathUtilsService } from "@lib/utils";
import {
  ProcessHtmlFileService
} from "../dom-service/service/process-html-file.service";
import {
  ProcessCssFileService
} from "../dom-service/service/process-css-file.service";

@singleton()
/**
 * The app service is responsible for build html file.
 */
export class BuildHtmlAppService {
  constructor(
    private readonly fileUtils: FileUtilsService,
    private readonly processHtmlFile: ProcessHtmlFileService,
    private readonly processCssFile: ProcessCssFileService,
    private readonly pathUtils: PathUtilsService
  ) {
  }

  run(
    inputPath: string, outputPath: string
  ): boolean {
    const htmlResultFile = this.processHtmlFile.process(
      inputPath, []
    );
    const cssResultFile = this.processCssFile.process(
      inputPath
    );
    const cssPath = this.pathUtils.createPath(
      [outputPath, "../style.css"]
    );
    this.fileUtils.writeTextFile(outputPath, htmlResultFile);
    this.fileUtils.writeTextFile(cssPath, cssResultFile);
    return true;
  }
}
