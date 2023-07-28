import { singleton } from "tsyringe";
import { SimpleMessageAppService } from "@lib/logger";
import { WsDomainStoreService } from "@lib/repox-workspace";
import { HtmlproDomainStoreService } from "@lib/htmlpro-workspace";

@singleton()
/**
 * The app service is responsible for load htmlpro domain model.
 */
export class LoadHtmlproDomainAppService {
  constructor(
    private readonly simpleMessage: SimpleMessageAppService,
    private readonly htmlproDomainStore: HtmlproDomainStoreService
  ) {
  }

  run(): boolean {
    this.simpleMessage.writePlain("Load HTMLPRO domain model");
    this.htmlproDomainStore.loadHtmlproDomain();
    return true;
  }
}
