import { singleton } from "tsyringe";
import { mkdirSync } from "fs";
import { LoggerMessageAppService } from "@lib/logger";
import convertPath from "@stdlib/utils-convert-path";

@singleton()
/**
 * The service is responsible for create folder by name.
 */
export class ExecCreateFolderService {
  constructor(
    private readonly loggerMessageApp: LoggerMessageAppService
  ) {
  }

  exec(folderName: string): void {
    const folderPath = convertPath(folderName, "posix");
    this.loggerMessageApp.writePlain(
      `Create the folder ${folderPath}`, 0
    );
    mkdirSync(folderPath);
  }
}
