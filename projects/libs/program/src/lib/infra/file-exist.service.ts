import { singleton } from "tsyringe";
import { existsSync } from "fs";
import { SimpleMessageAppService } from "@lib/logger";

@singleton()
/**
 * The service is responsible for verify whether
 * file by name exists.
 */
export class FileExistService {
  constructor(
    private readonly simpleMessage: SimpleMessageAppService
  ) {
  }

  exist(folderName: string): boolean {
    this.simpleMessage.writePlain(
      `Check if the file ${folderName} exists.`, 0
    );
    if (existsSync(folderName)) {
      return true;
    }
    this.simpleMessage.writeError(
      `The file called ${folderName} does not exist!`, 0, false, true
    );
    this.simpleMessage.writeWarning(
      "Create a nonexistent file.", 0, false, true
    );
    return false;
  }
}
