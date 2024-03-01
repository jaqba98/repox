import {singleton} from "tsyringe";

import {ParamDomainStore} from "@lib/param-domain";
import {SimpleMessageAppService} from "@lib/logger";

import {UnknownUnknownAppService} from "../program/unknown-unknown-app.service";
import {GenerateWorkspaceAppService} from "../program/generate-workspace-app.service";
import {RegenerateWorkspaceAppService} from "../program/regenerate-workspace-app.service";
import {GenerateProjectAppService} from "../program/generate-project-app.service";
import {ErrorMessageEnum} from "../../enum/message/error-message.enum";
import {ProgramEnum} from "../../enum/launcher/program.enum";
import {CommandEnum} from "../../enum/launcher/command.enum";
import {WarningMessageEnum} from "../../enum/message/warning-message.enum";

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
        if (program === ProgramEnum.unknown) return this.unknownCommand(command);
        if (program === ProgramEnum.generate) return this.generateCommand(command);
        if (program === ProgramEnum.regenerate) return this.regenerateCommand(command);
        this.throwLauncherProgramError();
        return false;
    }

    private unknownCommand(command: string): boolean {
        if (command === CommandEnum.unknown) return this.unknownUnknown.runProgram();
        this.throwLauncherCommandError();
        return false;
    }

    private generateCommand(command: string): boolean {
        if (command === CommandEnum.workspace) return this.generateWorkspace.runProgram();
        if (command === CommandEnum.project) return this.generateProject.runProgram();
        this.throwLauncherCommandError();
        return false;
    }

    private regenerateCommand(command: string): boolean {
        if (command === CommandEnum.workspace) return this.regenerateWorkspace.runProgram();
        this.throwLauncherCommandError();
        return false;
    }

    private throwLauncherProgramError(): void {
        this.simpleMessage.writeError(ErrorMessageEnum.programNotExist);
        this.simpleMessage.writeWarning(WarningMessageEnum.moreInfo);
    }

    private throwLauncherCommandError(): void {
        this.simpleMessage.writeError(ErrorMessageEnum.commandNotExist);
        this.simpleMessage.writeWarning(WarningMessageEnum.moreInfo);
    }
}
