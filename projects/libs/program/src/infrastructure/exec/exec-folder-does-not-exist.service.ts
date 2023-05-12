import { singleton } from "tsyringe";
import { existsSync } from "fs";
import { LoggerMessageAppService } from "@lib/logger";

@singleton()
/**
 * The service is responsible for verify whether folder by name
 * not exists.
 */
export class ExecFolderDoesNotExistService {
  constructor(
    private readonly loggerMessageApp: LoggerMessageAppService
  ) {
  }

  exec(folderName: string): boolean {
    if (!existsSync(folderName)) {
      this.loggerMessageApp.writePlain(
        `The ${folderName} name is available`, 0
      );
      return true;
    }
    this.loggerMessageApp.writeError(
      `The ${folderName} folder already exists`, 0
    );
    return false;
  }
}
