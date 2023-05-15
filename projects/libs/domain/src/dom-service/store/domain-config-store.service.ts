import { singleton } from "tsyringe";
import { DomainConfigFileEnum, DomainConfigModel } from "@lib/domain";
import { ReadFileService, WriteFileService } from "@lib/utils";

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
    this.store = this.readFile.readJsonFile<DomainConfigModel>(
      DomainConfigFileEnum.domainConfigJson
    );
  }

  saveConfig(): void {
    this.writeFile.writeJsonFile(
      DomainConfigFileEnum.domainConfigJson,
      this.store
    );
  }

  getConfig(): DomainConfigModel {
    if (this.store === undefined) {
      throw new Error("The store is undefined!");
    }
    return this.store;
  }
}
// todo: refactor