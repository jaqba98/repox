import { singleton } from "tsyringe";
import { PathUtilsService } from "@lib/utils";
import { SimpleMessageAppService } from "@lib/logger";
import { REPOX_FILE, TSCONFIG_FILE } from "@lib/const";

@singleton()
/**
 * The app service is responsible for checking whether
 * the given folder is a correct workspace.
 */
export class CheckWorkspaceAppService {
  constructor(
    private readonly pathUtils: PathUtilsService,
    private readonly simpleMessage: SimpleMessageAppService
  ) {
  }

  run(): boolean {
    // Check workspace
    if (this.pathUtils.notExistPath(REPOX_FILE)) {
      this.writeCheckWorkspaceError(REPOX_FILE);
      return false;
    }
    if (this.pathUtils.notExistPath(TSCONFIG_FILE)) {
      this.writeCheckWorkspaceError(TSCONFIG_FILE);
      return false;
    }
    // todo: add content structure verification of above files
    return true;
  }

  private writeCheckWorkspaceError(fileName: string): void {
    this.simpleMessage.writeError(
      `The ${fileName} configuration file not found`
    );
  }
}
