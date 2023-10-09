import {singleton} from "tsyringe";
import {SimpleMessageAppService} from "@lib/logger";
import {PathUtilsService} from "@lib/utils";
import {WorkspaceFileEnum, WsDtoStoreService} from "@lib/repox-workspace";

@singleton()
/**
 * The app service is responsible for load workspace dto model and verify it.
 */
export class LoadWsDtoAppService {
    constructor(
        private readonly simpleMessage: SimpleMessageAppService,
        private readonly pathUtils: PathUtilsService,
        private readonly wsDtoStore: WsDtoStoreService
    ) {
    }

    run(): boolean {
        this.simpleMessage.writePlain(`Step: Load WS dto`);
        if (this.pathUtils.notExistPath(WorkspaceFileEnum.repoxJsonFile)) {
            this.simpleMessage.writeError(`Incorrect workspace structure`);
            this.simpleMessage.writeError(`The ${WorkspaceFileEnum.repoxJsonFile} file does not exist`);
            return false;
        }
        if (this.pathUtils.notExistPath(WorkspaceFileEnum.tsconfigJsonFile)) {
            this.simpleMessage.writeError(`Incorrect workspace structure`);
            this.simpleMessage.writeError(`The ${WorkspaceFileEnum.tsconfigJsonFile} file does not exist`);
            return false;
        }
        this.wsDtoStore.loadWsDto();
        return true;
    }
}
