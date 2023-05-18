import { singleton } from "tsyringe";
import { mkdirSync } from "fs";
import { SimpleMessageAppService } from "@lib/logger";

@singleton()
/**
 * The service is responsible for create folder by name.
 */
export class ExecCreateFolderService {
  constructor(
    private readonly loggerMessageApp: SimpleMessageAppService
  ) {
  }

  exec(folderName: string): void {
    this.loggerMessageApp.writePlain(
      `Create the folder ${folderName}`, 0
    );
    mkdirSync(folderName);
  }
}
// todo: refactor
