import {singleton} from "tsyringe";

import {ParamDomainStore} from "@lib/param-domain";
import {UnknownUnknownProgram} from "./program/unknown-unknown.program";
import {SimpleMessageAppService} from "@lib/logger";
import {
    GenerateWorkspaceProgramService
} from "./program/generate-workspace-program.service";
import {
    RegenerateWorkspaceProgramService
} from "./program/regenerate-workspace-program.service";
import {GenerateProjectProgramService} from "./program/generate-project-program.service";

@singleton()
/**
 * The app service is responsible for selecting service to run
 * by given program name and command name.
 */
export class RepoxProgramLauncher {
    constructor(
        private readonly store: ParamDomainStore,
        private readonly unknownUnknown: UnknownUnknownProgram,
        private readonly generateWorkspace: GenerateWorkspaceProgramService,
        private readonly regenerateWorkspace: RegenerateWorkspaceProgramService,
        private readonly generateProject: GenerateProjectProgramService,
        private readonly simpleMessage: SimpleMessageAppService
    ) {
    }

    launchProgram(): boolean {
        const {program} = this.store.get();
        switch (program) {
            case "unknown":
                return this.launchUnknownCommand();
            case "generate":
                return this.launchGenerateCommand();
            case "regenerate":
                return this.launchRegenerateCommand();
            default:
                this.simpleMessage.writeError(
                    `The ${program} program does not exist!`
                );
                return false;
        }
    }

    private launchUnknownCommand(): boolean {
        const {command} = this.store.get();
        switch (command) {
            case "unknown":
                return this.unknownUnknown.runProgram();
            default:
                this.simpleMessage.writeError(
                    `The ${command} command does not exist for specified program!`
                );
                return false;
        }
    }

    private launchGenerateCommand(): boolean {
        const {command} = this.store.get();
        switch (command) {
            case "workspace":
                return this.generateWorkspace.runProgram();
            case "project":
                return this.generateProject.runProgram();
            default:
                this.simpleMessage.writeError(
                    `The ${command} command does not exist for specified program!`
                );
                return false;
        }
    }

    private launchRegenerateCommand(): boolean {
        const {command} = this.store.get();
        switch (command) {
            case "workspace":
                return this.regenerateWorkspace.runProgram();
            default:
                this.simpleMessage.writeError(
                    `The ${command} command does not exist for specified program!`
                );
                return false;
        }
    }
}
