import { singleton } from "tsyringe";
import {
  DomainConfigModel,
  DomainConfigStoreService
} from "@lib/domain";

@singleton()
/**
 * The app service is responsible for load, save, update
 * the domain configuration.
 */
export class DomainConfigAppService {
  constructor(
    private readonly domainConfigStore: DomainConfigStoreService
  ) {
  }

  loadDomainConfig(): void {
    this.domainConfigStore.loadConfig();
  }

  saveDomainConfig(): void {
    this.domainConfigStore.saveConfig();
  }

  getDomainConfig(): DomainConfigModel {
    return this.domainConfigStore.getConfig();
  }
}
