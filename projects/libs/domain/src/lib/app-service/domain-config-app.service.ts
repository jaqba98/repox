import { singleton } from "tsyringe";
import {
  DomainConfigStoreService
} from "../dom-service/store/domain-config-store.service";

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

  addProject(name: string): void {
    this.domainConfigStore.addProject(name);
  }
}
