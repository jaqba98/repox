import {singleton} from "tsyringe";

import {NewlineAppService, SimpleMessageAppService} from "@lib/logger";
import {REPOX_LOGO} from "@lib/repox-const";

@singleton()
/**
 * The start point of the program generate, command workspace.
 * Possible arguments
 */
export class GenerateWorkspaceProgramService {
    constructor(
        private readonly simpleMessage: SimpleMessageAppService,
        private readonly newline: NewlineAppService
    ) {
    }

    runProgram(): boolean {
        this.simpleMessage.writeInfo("Generate Project", REPOX_LOGO);
        this.newline.writeNewline();
        return true;
    }
}

// todo: refactor the code