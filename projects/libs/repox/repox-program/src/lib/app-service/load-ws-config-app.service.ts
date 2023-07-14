import { singleton } from "tsyringe";
import { SimpleMessageAppService } from "@lib/logger";
import { WsDtoStoreService } from "@lib/repox-workspace";

@singleton()
/**
 * The app service is responsible for load all workspace
 * configuration.
 */
export class LoadWsConfigAppService {
  constructor(
    private readonly simpleMessage: SimpleMessageAppService,
    private readonly wsDtoStore: WsDtoStoreService
  ) {
  }

  run(): boolean {
    this.simpleMessage.writePlain("Load repox configuration");
    this.wsDtoStore.loadWsDto();
    return true;
  }
}

// todo: refactor
