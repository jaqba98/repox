import {singleton} from "tsyringe";

import {firstLetterUpperCase} from "@lib/utils";

import {ProgramEnum} from "../../enum/launcher/program.enum";
import {CommandEnum} from "../../enum/launcher/command.enum";

@singleton()
/**
 * The builder is responsible for creating header for given program and command.
 */
export class ProgramHeaderBuilder {
    build(program: ProgramEnum, command: CommandEnum): string {
        const programHeader = firstLetterUpperCase(program);
        const commandHeader = firstLetterUpperCase(command);
        return `${programHeader} ${commandHeader}`;
    }
}
