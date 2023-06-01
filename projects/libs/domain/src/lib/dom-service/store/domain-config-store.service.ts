import { singleton } from "tsyringe";
import { DomainConfigFileEnum } from "@lib/domain";
import { ReadFileService, WriteFileService } from "@lib/utils";
import { DomainConfigModel } from "../../model/domain-config.model";
import {
  ConvertProjectTypeService
} from "../../../../../project/src/lib/dom-service/converter/convert-project-type.service";
import {
  BuildProjectPathService
} from "../../../../../project/src/lib/dom-service/builder/build-project-path.service";
import { ProjectTypeEnum } from "@lib/project";
import { SimpleMessageAppService } from "@lib/logger";
import { SYSTEM_VERSION } from "@lib/const";
import * as process from "process";

@singleton()
/**
 * The store of domain configuration, which is used to read,
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
}
