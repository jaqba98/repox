import { singleton } from "tsyringe";
import {
  DomainConfigStoreService
} from "../dom-service/store/domain-config-store.service";
import { ProjectDomainModel, ProjectTypeEnum } from "@lib/project";

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

  checkProjectExist(name: string): boolean {
    return this.domainConfigStore.checkProjectExist(name);
  }

  addProject(
    name: string, type: ProjectTypeEnum, path: string
  ): void {
    this.domainConfigStore.addProject(name, type, path);
  }

  getProject(name: string): ProjectDomainModel | undefined {
    return this.domainConfigStore.getProject(name);
  }
}
// todo: refactor