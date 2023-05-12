import { singleton } from "tsyringe";
import { sync } from "command-exists";
import { LoggerMessageAppService } from "@lib/logger";

@singleton()
/**
 * The service is responsible for verify whether program
 * is installed.
 */
export class ExecProgramInstalledService {
  constructor(
    private readonly loggerMessageApp: LoggerMessageAppService
  ) {
  }

  exec(program: string): boolean {
    if (sync(program)) {
      this.loggerMessageApp.writePlain(
        `Program ${program} is installed`, 0
      );
      return true;
    }
    this.loggerMessageApp.writeError(
      `Program ${program} is not installed`, 0
    );
    return false;
  }
}
