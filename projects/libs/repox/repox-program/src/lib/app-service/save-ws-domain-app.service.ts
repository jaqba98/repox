import { singleton } from "tsyringe";
import { SimpleMessageAppService } from "@lib/logger";
import { WsDomainStoreService } from "@lib/repox-workspace";

@singleton()
/**
 * The app service is responsible for save workspace domain model
 * to the dto model.
 */
export class SaveWsDomainAppService {
  constructor (
    private readonly simpleMessage: SimpleMessageAppService,
    private readonly wsDomainStore: WsDomainStoreService
  ) {
  }

  run (): boolean {
    this.simpleMessage.writePlain("Save workspace domain model");
    this.wsDomainStore.saveWsDomain();
    return true;
  }
}
