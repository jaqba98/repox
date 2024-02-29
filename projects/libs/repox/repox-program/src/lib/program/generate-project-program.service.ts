import {singleton} from "tsyringe";

import {REPOX_LOGO} from "@lib/repox-const";
import {NewlineAppService, SimpleMessageAppService} from "@lib/logger";
import {GoToWorkspaceRootAppService} from "@lib/program-step";

import {LoadWorkspaceDtoAppService} from "../app-service/load-workspace-dto-app.service";
import {SaveWorkspaceDtoAppService} from "../app-service/save-workspace-dto-app.service";

@singleton()
/**
 * The start point of the program generate, command project.
 */
export class GenerateProjectProgramService {
    constructor(
        private readonly simpleMessage: SimpleMessageAppService,
        private readonly newline: NewlineAppService,
        private readonly goToWorkspaceRoot: GoToWorkspaceRootAppService,
        private readonly loadWorkspaceDto: LoadWorkspaceDtoAppService,
        // private readonly workspaceDtoStore: WorkspaceDtoStoreService,
        private readonly saveWorkspaceDto: SaveWorkspaceDtoAppService
    ) {
    }

    runProgram(): boolean {
        this.simpleMessage.writeInfo("Generate Program", REPOX_LOGO);
        this.newline.writeNewline();
        if (!this.goToWorkspaceRoot.run()) return false;
        if (!this.loadWorkspaceDto.run()) return false;
        // this.workspaceDtoStore.addProject();
        if (!this.saveWorkspaceDto.run()) return false;
        this.newline.writeNewline();
        this.simpleMessage.writeSuccess("Command executed correctly!");
        return true;
    }
}
