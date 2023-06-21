import { singleton } from "tsyringe";
import { copyFileSync, existsSync } from "fs";
import { SimpleMessageAppService } from "@lib/logger";
import { join } from "path";

@singleton()
/**
 * The service is responsible for copy file to the destination path.
 */
export class CopyFileService {
  constructor(
    private readonly simpleMessage: SimpleMessageAppService
  ) {
  }

  copy(
    inputDir: string, outputDir: string, fileName: string
  ): boolean {
    const inputPath = join(inputDir, fileName);
    const outputPath = join(outputDir, fileName);
    this.simpleMessage.writePlain(
      `Copy the ${inputPath} file to ${outputPath}`, 0
    );
    if (!existsSync(inputPath)) {
      this.simpleMessage.writeError(
        "The input path does not exist!", 0, false, true
      );
      return false;
    }
    if (!existsSync(outputDir)) {
      this.simpleMessage.writeError(
        "The output path does not exist!", 0, false, true
      );
      return false;
    }
    copyFileSync(inputPath, outputPath);
    return true;
  }
}
// todo: refactor
