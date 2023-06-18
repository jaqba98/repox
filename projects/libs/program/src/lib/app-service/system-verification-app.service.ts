// Refactored file
import { singleton } from "tsyringe";
import {
  ProgramInstalledService
} from "../infrastructure/program-installed.service";
import { SimpleMessageAppService } from "@lib/logger";

@singleton()
/**
 * The app service is responsible for checking
 * whether the system is correct and everything is installed.
 */
export class SystemVerificationAppService {
  constructor(
    private readonly programInstalled: ProgramInstalledService,
    private readonly simple: SimpleMessageAppService
  ) {
  }

  checkSystem(): boolean {
    if (!this.programInstalled.check("git")) {
      this.simple.writeError(
        "The GIT is not installed on the computer", 0, false, true
      );
      this.simple.writeWarning(
        "Install GIT on the computer", 0, false, true
      );
      return false;
    }
    if (!this.programInstalled.check("node")) {
      this.simple.writeError(
        "The NODE.JS is not installed on the computer", 0, false, true
      );
      this.simple.writeWarning(
        "Install NODE.JS on the computer", 0, false, true
      );
      return false;
    }
    if (!this.programInstalled.check("npm")) {
      this.simple.writeError(
        "The NPM is not installed on the computer", 0, false, true
      );
      this.simple.writeWarning(
        "Install NPM on the computer", 0, false, true
      );
      return false;
    }
    return true;
  }
}
