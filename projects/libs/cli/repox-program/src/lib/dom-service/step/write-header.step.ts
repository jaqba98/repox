// done
import { singleton } from "tsyringe";

import { SimpleMessageAppService, NewlineAppService } from "@lib/logger";
import { firstLetterUpperCase } from "@lib/utils";
import { REPOX_LOGO } from "@lib/repox-const";
import { EMPTY_STRING, SPACE } from "@lib/const";

import { CommandEnum } from "../../enum/launcher/command.enum";
import { ProgramEnum } from "../../enum/launcher/program.enum";

@singleton()
/**
 * The step dom-service is responsible for writing header on the console screen.
 */
export class WriteHeaderStep {
    constructor (
    private readonly simpleMessage: SimpleMessageAppService,
    private readonly newline: NewlineAppService
    ) {}

    run (program: ProgramEnum, command: CommandEnum): boolean {
        const programHeader = this.getProgramHeader(program);
        const commandHeader = this.getCommandHeader(command);
        const header = this.buildHeader(programHeader, commandHeader);
        this.simpleMessage.writeInfo(header, REPOX_LOGO);
        this.newline.writeNewline();
        return true;
    }

    private getProgramHeader (program: ProgramEnum): string {
        return program === ProgramEnum.unknown
            ? EMPTY_STRING
            : firstLetterUpperCase(program);
    }

    private getCommandHeader (command: CommandEnum): string {
        return command === CommandEnum.unknown
            ? EMPTY_STRING
            : firstLetterUpperCase(command);
    }

    private buildHeader (program: string, command: string): string {
        const programHeader = program === EMPTY_STRING
            ? EMPTY_STRING
            : program.concat(SPACE);
        return programHeader.concat(command);
    }
}
