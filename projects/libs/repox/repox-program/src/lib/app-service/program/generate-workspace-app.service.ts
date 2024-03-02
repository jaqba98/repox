import {singleton} from "tsyringe";

import {WriteHeaderStep} from "../../dom-service/step/write-header.step";
import {ProgramEnum} from "../../enum/launcher/program.enum";
import {CommandEnum} from "../../enum/launcher/command.enum";
import {
    GetCommandArgSingleValueStep
} from "../../dom-service/step/get-command-arg-single-value.step";
import {SystemProgramExistStep} from "../../dom-service/step/system-program-exist.step";
import {SystemProgramEnum} from "../../enum/system-program/system-program.enum";

@singleton()
/**
 * The service is responsible for generating workspace from scratch.
 * Argument | Alias | Required | Description
 * --name   | -n    | true     | Name of the workspace
 */
export class GenerateWorkspaceAppService {
    constructor(
        private readonly writeHeader: WriteHeaderStep,
        private readonly getCommandArgSingleValue: GetCommandArgSingleValueStep,
        private readonly systemProgramExist: SystemProgramExistStep
    ) {
    }

    run(): boolean {
        if (!this.writeHeader.run(ProgramEnum.generate, CommandEnum.workspace)) {
            return false;
        }
        const name = this.getCommandArgSingleValue.run("name", "n");
        if (!name) return false;
        if (!this.systemProgramExist.run(SystemProgramEnum.node)) return false;
        if (!this.systemProgramExist.run(SystemProgramEnum.npm)) return false;
        if (!this.systemProgramExist.run(SystemProgramEnum.git)) return false;
        return true;

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
