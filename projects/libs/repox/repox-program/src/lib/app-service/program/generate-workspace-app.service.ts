import {singleton} from "tsyringe";

import {ParamDomainStore} from "@lib/param-domain";

import {WriteHeaderStep} from "../../dom-service/step/write-header.step";
import {ProgramEnum} from "../../enum/launcher/program.enum";
import {CommandEnum} from "../../enum/launcher/command.enum";

@singleton()
/**
 * The service is responsible for generating workspace from scratch.
 * Arguments:
 * --name or -n | Required | Name of the workspace
 */
export class GenerateWorkspaceAppService {
    constructor(
        private readonly writeHeader: WriteHeaderStep,
        private readonly store: ParamDomainStore
    ) {
    }

    run(): boolean {
        if (!this.writeHeader.run(ProgramEnum.generate, CommandEnum.workspace)) {
            return false;
        }
        // Get arguments
        const name = this.store.getCommandArg("name", "n");
        if (!name) return false;
        console.log(name);
        return true;

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
