import { singleton } from "tsyringe";
import { DomainConfigFileEnum } from "@lib/domain";
import { ReadFileService, WriteFileService } from "@lib/utils";
import { DomainConfigModel } from "../../model/domain-config.model";
import { ProjectDomainModel, ProjectTypeEnum } from "@lib/project";
import { SYSTEM_VERSION } from "@lib/const";

@singleton()
/**
 * The base-store of domain configuration, which is used to read,
 * write and modify the domain configuration.
 */
export class DomainConfigStoreService {
  private store: DomainConfigModel;

  constructor(
    private readonly readFile: ReadFileService,
    private readonly writeFile: WriteFileService
  ) {
    this.store = {
      version: SYSTEM_VERSION,
      projects: {}
    };
  }

  loadConfig(): void {
    this.store = this.readFile.readJson<DomainConfigModel>(
      DomainConfigFileEnum.configJson
    );
  }

  saveConfig(): void {
    this.writeFile.writeJson(
      DomainConfigFileEnum.configJson, this.store
    );
  }

  checkProjectExist(name: string): boolean {
    return Object.values(this.store.projects)
      .some(project => project.name === name);
  }

  addProject(
    name: string, type: ProjectTypeEnum, path: string
  ): void {
    this.store.projects[name] = { name, type, path };
  }

  getProject(name: string): ProjectDomainModel | undefined {
    return Object.values(this.store.projects)
      .find(project => project.name === name);
  }
}
// todo: refactor