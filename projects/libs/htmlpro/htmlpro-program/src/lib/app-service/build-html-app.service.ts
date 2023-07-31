import { singleton } from "tsyringe";
import { FileUtilsService } from "@lib/utils";
import {
  ProcessHtmlFileService
} from "../dom-service/service/process-html-file.service";

@singleton()
/**
 * The app service is responsible for build html file.
 */
export class BuildHtmlAppService {
  constructor(
    private readonly fileUtils: FileUtilsService,
    private readonly processHtmlFile: ProcessHtmlFileService
  ) {
  }

  run(inputPath: string, outputPath: string): boolean {
    const htmlResultFile = this.processHtmlFile.process(
      inputPath, []
    );
    this.fileUtils.writeTextFile(outputPath, htmlResultFile);
    return true;
  }
}
