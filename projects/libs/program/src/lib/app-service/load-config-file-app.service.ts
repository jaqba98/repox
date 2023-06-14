import { singleton } from "tsyringe";
import { FileExistService } from "../infra/file-exist.service";
import { DomainConfigStoreService } from "@lib/domain";
import { SimpleMessageAppService } from "@lib/logger";

@singleton()
/**
 * The app service is responsible for load configuration.
 */
export class LoadConfigFileAppService {
  constructor(
    private readonly fileExist: FileExistService,
    private readonly simpleMessage: SimpleMessageAppService,
    private readonly domainConfigStore: DomainConfigStoreService
  ) {
  }

  loadConfig(): boolean {
    this.simpleMessage.writePlain("Load the config files", 0);
    this.domainConfigStore.loadConfig();
    return true;
  }
}
