import { singleton } from "tsyringe";
import { mkdirSync } from "fs";
import { LoggerMessageAppService } from "@lib/logger";

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
    this.loggerMessageApp.writePlain(
      `Create a folder ${folderName}`, 0
    );
    mkdirSync(folderName);
  }
}
