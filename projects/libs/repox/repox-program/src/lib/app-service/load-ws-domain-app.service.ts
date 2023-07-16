import { singleton } from "tsyringe";
import { SimpleMessageAppService } from "@lib/logger";
import { WsDomainStoreService } from "@lib/repox-workspace";

@singleton()
/**
 * The app service is responsible for load workspace domain model.
 */
export class LoadWsDomainAppService {
  constructor(
    private readonly simpleMessage: SimpleMessageAppService,
    private readonly wsDomainStore: WsDomainStoreService
  ) {
  }

  run(): boolean {
    this.simpleMessage.writePlain("Load workspace domain model");
    this.wsDomainStore.loadWsDomain();
    return true;
  }
}
