// Refactored file
import { singleton } from "tsyringe";
import { SimpleMessageAppService } from "@lib/logger";
// import { DomainConfigStoreService } from "@lib/domain";

@singleton()
/**
 * The app service is responsible for load configuration.
 */
export class LoadConfigFileAppService {
  constructor(
    private readonly simpleMessage: SimpleMessageAppService,
    // private readonly domainConfigStore: DomainConfigStoreService
  ) {
  }

  loadConfig(): boolean {
    this.simpleMessage.writePlain("Loading configuration");
    // this.domainConfigStore.loadConfig();
    return true;
  }
}
// todo: refactor
