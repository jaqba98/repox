import {singleton} from "tsyringe";

import {SimpleMessageAppService, StepMessageAppService} from "@lib/logger";
import {RunGenerateWorkspaceService} from "@lib/repox-workspace";

@singleton()
/**
 * This app service is responsible for generating workspace structure.
 */
export class GenerateWorkspaceAppService {
    constructor(
        private readonly stepMessage: StepMessageAppService,
        private readonly runGenerateWorkspace: RunGenerateWorkspaceService,
        private readonly simpleMessage: SimpleMessageAppService
    ) {
    }

    run(): boolean {
        this.stepMessage.write("Generate Workspace");
        if (this.runGenerateWorkspace.run()) return true;
        this.simpleMessage.writeError("Failed to generate workspace!");
        return false;
    }
}
