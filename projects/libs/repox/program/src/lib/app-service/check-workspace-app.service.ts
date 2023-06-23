// Refactored file
import { singleton } from "tsyringe";
import { SimpleMessageAppService } from "@lib/logger";
import { REPOX_FILE, REPOX_LOGO, TSCONFIG_FILE } from "@lib/const";
import { FileUtilsService } from "@lib/utils";

@singleton()
/**
 * The app service is responsible for check whether
 * the given folder is a correct workspace.
 */
export class WorkspaceCheckAppService {
  constructor(
    private readonly fileExist: FileUtilsService,
    private readonly simpleMessage: SimpleMessageAppService
  ) {
  }

  checkWorkspace(): boolean {
    this.simpleMessage.writePlain("Check workspace");
    if (!this.fileExist.existFile(REPOX_FILE)) {
      this.displayError(REPOX_FILE);
      return false;
    }
    if (!this.fileExist.existFile(TSCONFIG_FILE)) {
      this.displayError(TSCONFIG_FILE);
      return false;
    }
    return true;
  }

  private displayError(configFile: string): void {
    this.simpleMessage.writeError(
      `The ${configFile} configuration file not found`, REPOX_LOGO
    );
  }
}
// todo: refactor
