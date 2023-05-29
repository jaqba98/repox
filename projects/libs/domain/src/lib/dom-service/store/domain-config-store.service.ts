import { singleton } from "tsyringe";
import { DomainConfigFileEnum } from "@lib/domain";
import { ReadFileService, WriteFileService } from "@lib/utils";
import { DomainConfigModel } from "../../model/domain-config.model";

@singleton()
/**
 * The store of domain configuration, which is used to read,
 * write and modify the domain configuration.
 */
export class DomainConfigStoreService {
  private store?: DomainConfigModel;

  constructor(
    private readonly readFile: ReadFileService,
    private readonly writeFile: WriteFileService
  ) {
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

  addProject(name: string): void {
    if (this.store === undefined) {
      throw new Error("The store is undefined! Cannot add project!");
    }
    this.store.projects[name] = { name, type: "app", path: "" };
  }
}
