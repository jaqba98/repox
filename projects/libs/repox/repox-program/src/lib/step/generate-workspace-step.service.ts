import {singleton} from "tsyringe";

import {GenerateWorkspaceCommandModel} from "@lib/repox-domain";
import {REPOX_LOGO} from "@lib/repox-const";
import {NewlineAppService, SimpleMessageAppService} from "@lib/logger";
import {ChangePathAppService, CreateFolderAppService, FolderNotExistAppService} from "@lib/program-step";
import {GenerateWorkspaceAppService} from "../app-service/generate-workspace-app.service";

@singleton()
/**
 * The program steps service is responsible for executing the step list to generate workspace.
 */
export class GenerateWorkspaceStepService {
    constructor(
        private readonly simpleMessage: SimpleMessageAppService,
        private readonly newline: NewlineAppService,
        private readonly folderNotExist: FolderNotExistAppService,
        private readonly createFolder: CreateFolderAppService,
        private readonly changePath: ChangePathAppService,
        private readonly generateWorkspace: GenerateWorkspaceAppService
    ) {
    }

    runProgramSteps(_programModel: Record<string, never>, commandModel: GenerateWorkspaceCommandModel): void {
        this.simpleMessage.writeInfo("Generate Workspace", REPOX_LOGO);
        this.newline.writeNewline();
        const {workspaceName} = commandModel;
        if (!this.folderNotExist.run(workspaceName)) return;
        if (!this.createFolder.run(workspaceName)) return;
        if (!this.changePath.run(workspaceName)) return;
        if (!this.generateWorkspace.run()) return;
        this.newline.writeNewline();
        this.simpleMessage.writeSuccess("Command executed correctly!");
    }
}

// todo: done