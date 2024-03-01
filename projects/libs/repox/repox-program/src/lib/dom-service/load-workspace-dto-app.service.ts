import {singleton} from "tsyringe";

import {SimpleMessageAppService, StepMessageAppService} from "@lib/logger";
import {PathUtilsService} from "@lib/utils";
import {WorkspaceDtoStoreService, WorkspaceFileEnum} from "@lib/repox-workspace";

@singleton()
/**
 * The app service is responsible for loading workspace dto model.
 */
export class LoadWorkspaceDtoAppService {
    constructor(
        private readonly stepMessage: StepMessageAppService,
        private readonly simpleMessage: SimpleMessageAppService,
        private readonly pathUtils: PathUtilsService,
        private readonly workspaceDtoStore: WorkspaceDtoStoreService
    ) {
    }

    run(): boolean {
        this.stepMessage.write("Load Workspace DTO");
        if (this.pathUtils.notExistPath(WorkspaceFileEnum.repoxJson)) {
            this.writeIncorrectWorkspaceStructure(WorkspaceFileEnum.repoxJson);
            return false;
        }
        if (this.pathUtils.notExistPath(WorkspaceFileEnum.tsconfigJson)) {
            this.writeIncorrectWorkspaceStructure(WorkspaceFileEnum.tsconfigJson);
            return false;
        }
        this.workspaceDtoStore.load();
        return true;
    }

    private writeIncorrectWorkspaceStructure(workspaceFile: WorkspaceFileEnum): void {
        this.simpleMessage.writeError("Incorrect workspace structure!");
        this.simpleMessage.writeError(`The ${workspaceFile} file does not exist!`);
    }
}
