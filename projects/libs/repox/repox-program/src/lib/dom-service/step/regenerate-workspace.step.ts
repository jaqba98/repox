import {singleton} from "tsyringe";

import {ComplexMessageAppService, StepMessageAppService} from "@lib/logger";
import {RunRegenerateWorkspaceAppService} from "@lib/repox-workspace";

import {regenerateWorkspaceStepMsg} from "../../const/message/step-message.const";
import {
    failedToRegenerateWorkspaceErrorMsg
} from "../../const/message/error-message.enum";

@singleton()
/**
 * The step service is responsible for regenerating workspace.
 */
export class RegenerateWorkspaceStep {
    constructor(
        private readonly stepMessage: StepMessageAppService,
        private readonly runRegenerateWorkspace: RunRegenerateWorkspaceAppService,
        private readonly complexMessage: ComplexMessageAppService
    ) {
    }

    run(): boolean {
        this.stepMessage.write(regenerateWorkspaceStepMsg());
        if (this.runRegenerateWorkspace.run()) return true;
        this.complexMessage.writeError([
            failedToRegenerateWorkspaceErrorMsg()
        ]);
        return false;
    }
}
