import {singleton} from "tsyringe";

import {SimpleMessageAppService, StepMessageAppService} from "@lib/logger";

@singleton()
/**
 * The app service is responsible for checking whether the command had run with force mode.
 */
export class CheckForceModeAppService {
    constructor(
        private readonly stepMessage: StepMessageAppService,
        private readonly simpleMessage: SimpleMessageAppService
    ) {
    }

    run(isForceMode: boolean): boolean {
        this.stepMessage.write("Check Force Mode");
        if (isForceMode) return true;
        this.simpleMessage.writeError("The command requires force mode to run!");
        this.simpleMessage.writeWarning("Rerun the command with the --force flag.");
        return false;
    }
}

// todo: done