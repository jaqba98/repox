import {singleton} from "tsyringe";

import {REPOX_LOGO} from "@lib/repox-const";
import {NewlineAppService, SimpleMessageAppService} from "@lib/logger";

import {ProgramEnum} from "../../enum/launcher/program.enum";
import {CommandEnum} from "../../enum/launcher/command.enum";
import {ProgramHeaderBuilder} from "../builder/program-header.builder";

@singleton()
/**
 * The step service is responsible for writing header on the console screen.
 */
export class WriteHeaderStepService {
    constructor(
        private readonly programHeader: ProgramHeaderBuilder,
        private readonly simpleMessage: SimpleMessageAppService,
        private readonly newline: NewlineAppService
    ) {
    }

    run(program: ProgramEnum, command: CommandEnum): boolean {
        const header = this.programHeader.build(program, command);
        this.simpleMessage.writeInfo(header, REPOX_LOGO);
        this.newline.writeNewline();
        return true;
    }
}
