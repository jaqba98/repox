import { singleton } from "tsyringe";
import { FileUtilsService } from "@lib/utils";
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
    private readonly processCssFile: ProcessCssFileService
  ) {
  }

  run(inputPath: string, outputPath: string): boolean {
    const htmlResultFile = this.processHtmlFile.process(
      inputPath, []
    );
    const cssResultFile = this.processCssFile.process(
      inputPath
    );
    this.fileUtils.writeTextFile(outputPath, htmlResultFile);
    this.fileUtils.writeTextFile("output.css", cssResultFile);
    return true;
  }
}
