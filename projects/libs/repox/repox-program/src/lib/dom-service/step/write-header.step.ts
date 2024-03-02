import {singleton} from "tsyringe";

import {REPOX_LOGO} from "@lib/repox-const";
import {NewlineAppService, SimpleMessageAppService} from "@lib/logger";
import {firstLetterUpperCase} from "@lib/utils";

import {ProgramEnum} from "../../enum/launcher/program.enum";
import {CommandEnum} from "../../enum/launcher/command.enum";

@singleton()
/**
 * The step service is responsible for writing header on the console screen.
 */
export class WriteHeaderStep {
    constructor(
        private readonly simpleMessage: SimpleMessageAppService,
        private readonly newline: NewlineAppService
    ) {
    }

    run(program: ProgramEnum, command: CommandEnum): boolean {
        const programHeader = firstLetterUpperCase(program);
        const commandHeader = firstLetterUpperCase(command);
        const header = `${programHeader} ${commandHeader}`;
        this.simpleMessage.writeInfo(header, REPOX_LOGO);
        this.newline.writeNewline();
        return true;
    }
}
