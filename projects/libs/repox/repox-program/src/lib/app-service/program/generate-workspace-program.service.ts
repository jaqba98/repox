import {singleton} from "tsyringe";

import {NewlineAppService, SimpleMessageAppService} from "@lib/logger";
import {REPOX_LOGO} from "@lib/repox-const";
import {ParamDomainStore} from "@lib/param-domain";
import {
    ChangePathAppService,
    CreateFolderAppService,
    FoldersNotExistAppService, RunCommandAppService,
    SystemProgramEnum,
    SystemProgramExistAppService
} from "@lib/program-step";
import {GenerateWorkspaceAppService} from "../../dom-service/generate-workspace-app.service";

@singleton()
/**
 * The start point of the program generate, command workspace.
 * Possible arguments
 */
export class GenerateWorkspaceProgramService {
    constructor(
        private readonly simpleMessage: SimpleMessageAppService,
        private readonly newline: NewlineAppService,
        private readonly store: ParamDomainStore,
        private readonly foldersNotExist: FoldersNotExistAppService,
        private readonly createFolder: CreateFolderAppService,
        private readonly changePath: ChangePathAppService,
        private readonly generateWorkspace: GenerateWorkspaceAppService,
        private readonly systemProgramExist: SystemProgramExistAppService,
        private readonly runCommand: RunCommandAppService
    ) {
    }

    runProgram(): boolean {
        this.simpleMessage.writeInfo("Generate Workspace", REPOX_LOGO);
        this.newline.writeNewline();
        const workspaceNames = this.store.getCommandArg("name", "n");
        if (!workspaceNames) {
            this.simpleMessage.writeError("You did not specify a workspace name!");
            this.simpleMessage.writeWarning("Specify workspace name by --name or -n and rerun the program.");
            return false;
        }
        if (!this.systemProgramExist.run(SystemProgramEnum.git)) return false;
        if (!this.runCommand.run("npm i -g pnpm")) return false;
        if (!this.foldersNotExist.run(workspaceNames)) return false;
        for (const workspaceName of workspaceNames) {
            if (!this.createFolder.run(workspaceName)) return false;
            if (!this.changePath.run(workspaceName)) return false;
            if (!this.generateWorkspace.run()) return false;
            if (!this.runCommand.run("pnpm install --prefer-offline")) return false;
            if (!this.runCommand.run("git init")) return false;
            if (!this.runCommand.run("git config core.autocrlf false")) return false;
            if (!this.runCommand.run("git add .")) return false;
            if (!this.runCommand.run('git commit -m "initial commit"')) return false;
            if (!this.changePath.run("../")) return false;
        }
        this.newline.writeNewline();
        this.simpleMessage.writeSuccess("Command executed correctly!");
        return true;
    }
}
