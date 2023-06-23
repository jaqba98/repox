// Refactored file
import { singleton } from "tsyringe";
import { SimpleMessageAppService } from "@lib/logger";
import { REPOX_LOGO } from "@lib/const";
import { SystemUtilsService } from "@lib/utils";

@singleton()
/**
 * The app service is responsible for checking
 * whether the system is correct and everything is installed.
 */
export class SystemVerificationAppService {
  constructor(
    private readonly programInstalled: SystemUtilsService,
    private readonly simple: SimpleMessageAppService
  ) {
  }

  checkSystem(): boolean {
    if (!this.programInstalled.checkProgramExist("git")) {
      this.writeErrorMessage("GIT");
      return false;
    }
    if (!this.programInstalled.checkProgramExist("node")) {
      this.writeErrorMessage("NODE");
      return false;
    }
    if (!this.programInstalled.checkProgramExist("npm")) {
      this.writeErrorMessage("NPM");
      return false;
    }
    return true;
  }

  private writeErrorMessage(program: string): void {
    this.simple.writeError(
      `The ${program} is not installed`, REPOX_LOGO
    );
    this.simple.writeWarning(
      `Install ${program} on the computer`, REPOX_LOGO
    );
  }
}
// todo: refactor
