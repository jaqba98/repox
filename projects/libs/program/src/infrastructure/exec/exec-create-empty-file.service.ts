import { singleton } from "tsyringe";
import { closeSync, openSync } from "fs";
import { LoggerMessageAppService } from "@lib/logger";
import { join } from "path";

@singleton()
/**
 * The service is responsible for create empty file by name.
 */
export class ExecCreateEmptyFileService {
  constructor(
    private readonly loggerMessageApp: LoggerMessageAppService
  ) {
  }

  exec(pathName: string, fileName: string): void {
    const path: string = join(pathName, fileName);
    this.loggerMessageApp.writePlain(
      `Create the empty ${path} file`, 0
    );
    closeSync(openSync(path, "w"));
  }
}
// todo: refactor