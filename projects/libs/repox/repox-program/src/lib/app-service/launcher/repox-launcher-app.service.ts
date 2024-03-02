import {singleton} from "tsyringe";

import {ParamDomainStore} from "@lib/param-domain";
import {SimpleMessageAppService} from "@lib/logger";

import {UnknownUnknownAppService} from "../program/unknown-unknown-app.service";
import {GenerateWorkspaceAppService} from "../program/generate-workspace-app.service";
import {RegenerateWorkspaceAppService} from "../program/regenerate-workspace-app.service";
import {GenerateProjectAppService} from "../program/generate-project-app.service";
import {commandNotExist, programNotExist} from "../../const/message/error-message.enum";
import {ProgramEnum} from "../../enum/launcher/program.enum";
import {CommandEnum} from "../../enum/launcher/command.enum";
import {moreInfoLookThroughOurDocs} from "../../const/message/warning-message.const";

@singleton()
/**
 * The app service is responsible for selecting service to run
 * by given program name and command name.
 */
export class RepoxLauncherAppService {
    constructor(
        private readonly store: ParamDomainStore,
        private readonly unknownUnknown: UnknownUnknownAppService,
        private readonly generateWorkspace: GenerateWorkspaceAppService,
        private readonly regenerateWorkspace: RegenerateWorkspaceAppService,
        private readonly generateProject: GenerateProjectAppService,
        private readonly simpleMessage: SimpleMessageAppService
    ) {
    }

    launch(): boolean {
        const {program, command} = this.store.get();
        if (program === ProgramEnum.unknown) return this.unknownProgram(program, command);
        if (program === ProgramEnum.generate) return this.generateProgram(program, command);
        if (program === ProgramEnum.regenerate) return this.regenerateProgram(program, command);
        this.throwLauncherProgramError(program);
        return false;
    }

    private unknownProgram(program: string, command: string): boolean {
        if (command === CommandEnum.unknown) return this.unknownUnknown.runProgram();
        this.throwLauncherCommandError(program, command);
        return false;
    }

    private generateProgram(program: string, command: string): boolean {
        if (command === CommandEnum.workspace) return this.generateWorkspace.run();
        if (command === CommandEnum.project) return this.generateProject.runProgram();
        this.throwLauncherCommandError(program, command);
        return false;
    }

    private regenerateProgram(program: string, command: string): boolean {
        if (command === CommandEnum.workspace) return this.regenerateWorkspace.runProgram();
        this.throwLauncherCommandError(program, command);
        return false;
    }

    private throwLauncherProgramError(program: string): void {
        this.simpleMessage.writeError(programNotExist(program));
        this.simpleMessage.writeWarning(moreInfoLookThroughOurDocs());
    }

    private throwLauncherCommandError(program: string, command: string): void {
        this.simpleMessage.writeError(commandNotExist(program, command));
        this.simpleMessage.writeWarning(moreInfoLookThroughOurDocs());
    }
}