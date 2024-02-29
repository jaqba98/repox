import {singleton} from "tsyringe";

import {REPOX_LOGO} from "@lib/repox-const";
import {NewlineAppService, SimpleMessageAppService} from "@lib/logger";
import {GoToWorkspaceRootAppService} from "@lib/program-step";
import {ParamDomainStore} from "@lib/param-domain";
import {WorkspaceDtoStoreService} from "@lib/repox-workspace";

import {LoadWorkspaceDtoAppService} from "../app-service/load-workspace-dto-app.service";
import {SaveWorkspaceDtoAppService} from "../app-service/save-workspace-dto-app.service";
import {AddProjectToDtoAppService} from "../app-service/add-project-to-dto-app.service";

@singleton()
/**
 * The start point of the program generate, command project.
 */
export class GenerateProjectProgramService {
    constructor(
        private readonly simpleMessage: SimpleMessageAppService,
        private readonly newline: NewlineAppService,
        private readonly store: ParamDomainStore,
        private readonly goToWorkspaceRoot: GoToWorkspaceRootAppService,
        private readonly loadWorkspaceDto: LoadWorkspaceDtoAppService,
        private readonly workspaceDtoStore: WorkspaceDtoStoreService,
        private readonly addProjectToDto: AddProjectToDtoAppService,
        private readonly saveWorkspaceDto: SaveWorkspaceDtoAppService
    ) {
    }

    runProgram(): boolean {
        this.simpleMessage.writeInfo("Generate Program", REPOX_LOGO);
        this.newline.writeNewline();
        const name = this.store.getCommandArg("name", "n");
        if (!name) {
            this.simpleMessage.writeError("You did not specify a project name!");
            this.simpleMessage.writeWarning("Specify project name by --name or -n and rerun the program.");
            return false;
        }
        const path = this.store.getCommandArg("path", "p");
        if (!path) {
            this.simpleMessage.writeError("You did not specify a project path!");
            this.simpleMessage.writeWarning("Specify project path by --path or -p and rerun the program.");
            return false;
        }
        const projectName = name[0];
        const projectPath = path[0];
        if (!this.goToWorkspaceRoot.run()) return false;
        if (!this.loadWorkspaceDto.run()) return false;
        if (!this.addProjectToDto.run(projectName, projectPath)) return false;
        if (!this.saveWorkspaceDto.run()) return false;
        this.newline.writeNewline();
        this.simpleMessage.writeSuccess("Command executed correctly!");
        return true;
    }
}
