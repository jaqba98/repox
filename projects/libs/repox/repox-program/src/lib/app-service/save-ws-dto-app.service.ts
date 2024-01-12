import {singleton} from "tsyringe";
import {SimpleMessageAppService} from "@lib/logger";
import {WsDtoStoreService} from "@lib/repox-workspace";

@singleton()
/**
 * The app service is responsible for save workspace dto model
 * to the real files.
 */
export class SaveWsDtoAppService {
    constructor(
        private readonly simpleMessage: SimpleMessageAppService,
        private readonly wsDtoStore: WsDtoStoreService
    ) {
    }

    run(): boolean {
        this.simpleMessage.writePlain(`Step: Save WS DTO`);
        this.wsDtoStore.saveWsDto();
        return true;
    }
}

// todo: refactor the code
