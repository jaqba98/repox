import { singleton } from "tsyringe";
import { execSync } from "child_process";
import { LoggerMessageAppService } from "@lib/logger";

@singleton()
/**
 * The service is responsible for run bash command.
 */
export class ExecRunCommandService {
  constructor(
    private readonly loggerMessageApp: LoggerMessageAppService
  ) {
  }

  exec(cmd: string): void {
    this.loggerMessageApp.writePlain(
      `Running the command: ${cmd}`, 0
    );
    execSync(cmd);
  }
}
// todo: refactor