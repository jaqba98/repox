import {singleton} from "tsyringe";

import {NewlineAppService, SimpleMessageAppService} from "@lib/logger";
import {REPOX_LOGO} from "@lib/repox-const";

import {ProgramHeaderBuilder} from "../../dom-service/builder/program-header.builder";
import {ProgramEnum} from "../../enum/launcher/program.enum";
import {CommandEnum} from "../../enum/launcher/command.enum";

@singleton()
/**
 * The service is responsible for generating workspace from scratch.
 */
export class GenerateWorkspaceAppService {
    constructor(
        private readonly programHeader: ProgramHeaderBuilder,
        private readonly simpleMessage: SimpleMessageAppService,
        private readonly newline: NewlineAppService
    ) {
    }

    run(): boolean {
        const header = this.programHeader.build(
            ProgramEnum.generate,
            CommandEnum.workspace
        );
        this.simpleMessage.writeInfo(header, REPOX_LOGO);
        this.newline.writeNewline();
        return true;

        // const workspaceNames = this.store.getCommandArg("name", "n");
        // if (!workspaceNames) {
        //     this.simpleMessage.writeError("You did not specify a workspace name!");
        //     this.simpleMessage.writeWarning("Specify workspace name by --name or -n and rerun the program.");
        //     return false;
        // }
        // if (!this.systemProgramExist.run(SystemProgramEnum.git)) return false;
        // if (!this.runCommand.run("npm i -g pnpm")) return false;
        // if (!this.foldersNotExist.run(workspaceNames)) return false;
        // for (const workspaceName of workspaceNames) {
        //     if (!this.createFolder.run(workspaceName)) return false;
        //     if (!this.changePath.run(workspaceName)) return false;
        //     // if (!this.generateWorkspace.runProgram()) return false;
        //     if (!this.runCommand.run("pnpm install --prefer-offline")) return false;
        //     if (!this.runCommand.run("git init")) return false;
        //     if (!this.runCommand.run("git config core.autocrlf false")) return false;
        //     if (!this.runCommand.run("git add .")) return false;
        //     if (!this.runCommand.run('git commit -m "initial commit"')) return false;
        //     if (!this.changePath.run("../")) return false;
        // }
        // this.newline.writeNewline();
        // this.simpleMessage.writeSuccess("Command executed correctly!");
    }
}
