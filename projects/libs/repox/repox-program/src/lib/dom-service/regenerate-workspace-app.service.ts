import {singleton} from "tsyringe";

import {SimpleMessageAppService, StepMessageAppService} from "@lib/logger";
import {RunRegenerateWorkspaceAppService} from "@lib/repox-workspace";

@singleton()
/**
 * This app service is responsible for regenerating workspace structure.
 */
export class RegenerateWorkspaceAppService {
    constructor(
        private readonly stepMessage: StepMessageAppService,
        private readonly runRegenerateWorkspace: RunRegenerateWorkspaceAppService,
        private readonly simpleMessage: SimpleMessageAppService
    ) {
    }

    run(): boolean {
        this.stepMessage.write("Regenerate Workspace");
        if (this.runRegenerateWorkspace.run()) return true;
        this.simpleMessage.writeError("Failed to regenerate workspace!");
        return false;
    }
}
