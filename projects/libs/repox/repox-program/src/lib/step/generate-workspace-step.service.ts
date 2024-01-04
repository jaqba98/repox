import {singleton} from "tsyringe";

import {GenerateWorkspaceCommandModel} from "@lib/repox-domain";
import {REPOX_LOGO} from "@lib/repox-const";
import {NewlineAppService, SimpleMessageAppService} from "@lib/logger";
import {CreateFolderAppService, FolderNotExistAppService} from "@lib/program-step";

@singleton()
/**
 * The program steps service is responsible for executing the step list to generate workspace.
 */
export class GenerateWorkspaceStepService {
    constructor(
        private readonly simpleMessage: SimpleMessageAppService,
        private readonly newline: NewlineAppService,
        private readonly folderNotExist: FolderNotExistAppService,
        private readonly createFolder: CreateFolderAppService
    ) {
    }

    runProgramSteps(_programModel: Record<string, never>, commandModel: GenerateWorkspaceCommandModel): void {
        this.simpleMessage.writeInfo("Generate Workspace", REPOX_LOGO);
        this.newline.writeNewline();
        const {workspaceName} = commandModel;
        if (!this.folderNotExist.run(workspaceName)) return;
        if (!this.createFolder.run(workspaceName)) return;
        console.log(workspaceName);
        // I am here
    }
}

// @singleton()
// /**
//  * The list of steps for the program generate workspace.
//  */
// export class GenerateWorkspaceStepService {
//   constructor(
//     private readonly createFolder: CreateFolderAppService,
//     private readonly changePath: ChangePathAppService,
//     private readonly generateWorkspace: GenerateWorkspaceAppService,
//     private readonly runCommand: RunCommandAppService
//   ) {
//   }
//
//   runSteps(
//     _programModel: Record<string, never>,
//     commandModel: GenerateWorkspaceCommandModel
//   ): void {
//     if (!this.changePath.run(workspaceName)) return;
//     if (!this.generateWorkspace.run()) return;
//     if (!this.runCommand.run(`git init`)) return;
//     if (!this.runCommand.run(`git config core.autocrlf false`)) return;
//     if (!this.runCommand.run(`git add .`)) return;
//     if (!this.runCommand.run(`git commit -m "init commit"`)) return;
//     this.newline.writeNewline();
//     this.simpleMessage.writeSuccess(`Command executed correctly`);
//   }
// }
