import { singleton } from "tsyringe";
import { existsSync } from "fs";
import { SimpleMessageAppService } from "@lib/logger";

@singleton()
/**
 * The service is responsible for verify whether folder by name
 * not exists.
 */
export class FolderDoesNotExistService {
  constructor(
    private readonly simpleMessage: SimpleMessageAppService
  ) {
  }

  notExist(folderName: string): boolean {
    this.simpleMessage.writePlain(
      "Checks if the folder with the given name does not exist", 0
    );
    if (!existsSync(folderName)) return true;
    this.simpleMessage.writeError(
      `The ${folderName} folder already exist`, 0, false, true
    );
    this.simpleMessage.writeWarning(
      "Specify an unused folder name", 0, false, true
    );
    return false;
  }
}
