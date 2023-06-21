// Refactored file
import { singleton } from "tsyringe";
import {
  FileExistService
} from "../infrastructure/file-exist.service";
import { SimpleMessageAppService } from "@lib/logger";
import { REPOX_FILE, TSCONFIG_FILE } from "@lib/const";

@singleton()
/**
 * The app service is responsible for check whether
 * the given folder is a correct workspace.
 */
export class WorkspaceCheckAppService {
  constructor(
    private readonly fileExist: FileExistService,
    private readonly simpleMessage: SimpleMessageAppService
  ) {
  }

  checkWorkspace(): boolean {
    this.simpleMessage.writePlain("Check workspace", 0);
    if (!this.fileExist.exist(REPOX_FILE)) {
      this.displayError(REPOX_FILE);
      return false;
    }
    if (!this.fileExist.exist(TSCONFIG_FILE)) {
      this.displayError(TSCONFIG_FILE);
      return false;
    }
    return true;
  }

  private displayError(configFile: string): void {
    this.simpleMessage.writeError(
      `The ${configFile} configuration file not found`, 0, false, true
    );
  }
}
