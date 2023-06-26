import { singleton } from "tsyringe";
import { PathUtilsService } from "@lib/utils";
import { SimpleMessageAppService } from "@lib/logger";
import {
  CheckDomainFilesAppService,
  DomainStoreService
} from "@lib/domain";

@singleton()
/**
 * The app service is responsible for checking whether
 * the given folder is a correct workspace.
 */
export class CheckWorkspaceAppService {
  constructor(
    private readonly checkDomainFiles: CheckDomainFilesAppService,
    private readonly pathUtils: PathUtilsService,
    private readonly domainStore: DomainStoreService,
    private readonly simpleMessage: SimpleMessageAppService
  ) {
  }

  run(): boolean {
    if (!this.checkDomainFiles.checkFilesExist()) {
      this.simpleMessage.writeError("Wrong workspace structure");
    }
    this.domainStore.loadDomain();
    // Check workspace files have correct structure
    return true;
  }

  private writeCheckWorkspaceError(fileName: string): void {
    this.simpleMessage.writeError(
      `The ${fileName} configuration file not found`
    );
  }
}
