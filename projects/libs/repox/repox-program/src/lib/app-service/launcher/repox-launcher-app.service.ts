import {singleton} from "tsyringe";

import {ParamDomainStore} from "@lib/param-domain";
import {UnknownUnknownProgram} from "../program/unknown-unknown.program";
import {SimpleMessageAppService} from "@lib/logger";
import {
    GenerateWorkspaceProgramService
} from "../program/generate-workspace-program.service";
import {
    RegenerateWorkspaceProgramService
} from "../program/regenerate-workspace-program.service";
import {GenerateProjectProgramService} from "../program/generate-project-program.service";

@singleton()
/**
 * The app service is responsible for selecting service to run
 * by given program name and command name.
 */
export class RepoxLauncherAppService {
    constructor(
        private readonly store: ParamDomainStore,
        private readonly unknownUnknown: UnknownUnknownProgram,
        private readonly generateWorkspace: GenerateWorkspaceProgramService,
        private readonly regenerateWorkspace: RegenerateWorkspaceProgramService,
        private readonly generateProject: GenerateProjectProgramService,
        private readonly simpleMessage: SimpleMessageAppService
    ) {
    }

    launch(): boolean {
        const {program} = this.store.get();
        if (program === "unknown") return this.launchUnknownCommand();
        if (program === "generate") return this.launchGenerateCommand();
        if (program === "regenerate") return this.launchRegenerateCommand();
        this.throwLauncherProgramError();
        return false;
    }

    private launchUnknownCommand(): boolean {
        const {command} = this.store.get();
        if (command === "unknown") return this.unknownUnknown.runProgram();
        this.throwLauncherCommandError();
        return false;
    }

    private launchGenerateCommand(): boolean {
        const {command} = this.store.get();
        if (command === "workspace") return this.generateWorkspace.runProgram();
        if (command === "project") return this.generateProject.runProgram();
        this.throwLauncherCommandError();
        return false;
    }

    private launchRegenerateCommand(): boolean {
        const {command} = this.store.get();
        if (command === "workspace") return this.regenerateWorkspace.runProgram();
        this.throwLauncherCommandError();
        return false;
    }

    private throwLauncherProgramError(): void {
        this.simpleMessage.writeError("The program does not exist!");
    }

    private throwLauncherCommandError(): void {
        this.simpleMessage.writeError("The command does not exist for specific program!");
    }
}
