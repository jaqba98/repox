import {singleton} from "tsyringe";

import {REPOX_LOGO} from "@lib/repox-const";
import {NewlineAppService, SimpleMessageAppService} from "@lib/logger";
import {
    ChangePathAppService,
    CreateFolderAppService,
    GoToWorkspaceRootAppService
} from "@lib/program-step";
import {ParamDomainStore} from "@lib/param-domain";

import {LoadWorkspaceDtoAppService} from "../app-service/load-workspace-dto-app.service";
import {SaveWorkspaceDtoAppService} from "../app-service/save-workspace-dto-app.service";
import {AddProjectToDtoAppService} from "../app-service/add-project-to-dto-app.service";
import {getCurrentPath} from "@lib/utils";

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
        private readonly addProjectToDto: AddProjectToDtoAppService,
        private readonly changePath: ChangePathAppService,
        private readonly createFolder: CreateFolderAppService,
        private readonly saveWorkspaceDto: SaveWorkspaceDtoAppService
    ) {
    }

    runProgram(): boolean {
        this.simpleMessage.writeInfo("Generate Program", REPOX_LOGO);
        this.newline.writeNewline();
        if (!this.goToWorkspaceRoot.run()) return false;
        const projectNames = this.store.getCommandArg("name", "n");
        if (!projectNames) {
            this.simpleMessage.writeError("You did not specify a project name!");
            this.simpleMessage.writeWarning("Specify project name by --name or -n and rerun the program.");
            return false;
        }
        const projectName = projectNames[0];
        const projectPaths = this.store.getCommandArg("path", "p");
        if (!projectPaths) {
            this.simpleMessage.writeError("You did not specify a project path!");
            this.simpleMessage.writeWarning("Specify project path by --path or -p and rerun the program.");
            return false;
        }
        const projectPath = projectPaths[0];
        const currentPath = getCurrentPath();
        if (!this.loadWorkspaceDto.run()) return false;
        if (!this.addProjectToDto.run(projectName, projectPath)) return false;
        if (!this.saveWorkspaceDto.run()) return false;
        if (!this.changePath.run(projectPath)) return false;
        if (!this.createFolder.run(projectName)) return false;
        if (!this.changePath.run(currentPath)) return false;
        this.newline.writeNewline();
        this.simpleMessage.writeSuccess("Command executed correctly!");
        return true;
    }
}
