import {singleton} from "tsyringe";

import {NewlineAppService, SimpleMessageAppService} from "@lib/logger";
import {REPOX_LOGO} from "@lib/repox-const";
import {GoToWorkspaceRootAppService} from "@lib/program-step";

@singleton()
/**
 * The start point of the program generate, command project.
 */
export class GenerateProjectProgramService {
    constructor(
        private readonly simpleMessage: SimpleMessageAppService,
        private readonly newline: NewlineAppService,
        private readonly goToWorkspaceRoot: GoToWorkspaceRootAppService
    ) {
    }

    runProgram(): boolean {
        this.simpleMessage.writeInfo("Generate Program", REPOX_LOGO);
        this.newline.writeNewline();
        if (!this.goToWorkspaceRoot.run()) return false;
        this.simpleMessage.writeSuccess("Command executed correctly!");
        return true;
    }
}
