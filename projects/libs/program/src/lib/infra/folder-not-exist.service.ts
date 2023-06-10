import { singleton } from "tsyringe";
import { existsSync } from "fs";
import { SimpleMessageAppService } from "projects/libs/logger/src";

@singleton()
/**
 * The service is responsible for verify whether
 * folder by name not exists.
 */
export class FolderNotExistService {
  constructor(
    private readonly simpleMessage: SimpleMessageAppService
  ) {
  }

  exist(folderName: string): boolean {
    this.simpleMessage.writePlain(
      "Check if the workspace folder does not exists.", 0
    );
    if (!existsSync(folderName)) {
      return true;
    }
    this.simpleMessage.writeError(
      `The folder called ${folderName} already exist!`, 0, false, true
    );
    this.simpleMessage.writeWarning(
      "Specify an unused folder name.", 0, false, true
    );
    return false;
  }
}
