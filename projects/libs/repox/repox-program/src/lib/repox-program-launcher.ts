import {singleton} from "tsyringe";

import {ParamDomainStore} from "@lib/param-domain";
import {UnknownUnknownProgram} from "./program/unknown-unknown.program";
import {SimpleMessageAppService} from "@lib/logger";
import {
    GenerateWorkspaceProgramService
} from "./program/generate-workspace-program.service";

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
        private readonly simpleMessage: SimpleMessageAppService
    ) {
    }

    launchProgram(): boolean {
        const {program, command} = this.store.get();
        const action = `${program}-${command}`;
        switch (action) {
            case "unknown-unknown":
                return this.unknownUnknown.runProgram();
            case "generate-workspace":
                return this.generateWorkspace.runProgram();
            default:
                this.simpleMessage.writeError(
                    `Repox does not support given program: ${program} ${command}`
                );
                return false;
        }
    }
}
