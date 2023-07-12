import { singleton } from "tsyringe";
import { SimpleMessageAppService } from "@lib/logger";
import { RepoxWorkspaceStoreService } from "@lib/repox-workspace";

@singleton()
/**
 * The app service is responsible for load configuration.
 */
export class LoadConfigFileAppService {
  constructor(
    private readonly simpleMessage: SimpleMessageAppService,
    private readonly repoxWorkspaceStore: RepoxWorkspaceStoreService
  ) {
  }

  run(): boolean {
    this.simpleMessage.writePlain("Loading configuration");
    this.repoxWorkspaceStore.loadWorkspace();
    return true;
  }
}
