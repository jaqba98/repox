import { singleton } from "tsyringe";
import { LoggerMessageAppService } from "@lib/logger";
import {
  ExecProgramInstalledService
} from "../infrastructure/exec/exec-program-installed.service";

@singleton()
/**
 * The app service is responsible for system verification.
 */
export class SystemVerificationAppService {
  constructor(
    private readonly programInstalled: ExecProgramInstalledService,
    private readonly loggerMessageApp: LoggerMessageAppService
  ) {
  }

  run(): boolean {
    this.loggerMessageApp.writeInfo("System verification", false, true, 0);
    this.loggerMessageApp.writeInfo("Checking if git is installed", false, false, 0);
    if (!this.programInstalled.exec("git")) return false;
    this.loggerMessageApp.writeInfo("Checking if node is installed", false, false, 0);
    if (!this.programInstalled.exec("node")) return false;
    this.loggerMessageApp.writeInfo("Checking if npm is installed", false, false, 0);
    return this.programInstalled.exec("npm");
  }
}
// todo: refactor