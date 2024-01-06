import {singleton} from "tsyringe";

import {SimpleMessageAppService, StepMessageAppService} from "@lib/logger";
import {GenerateWorkspaceStructureAppService} from "@lib/repox-workspace";

@singleton()
/**
 * This app service is responsible for generating workspace structure.
 */
export class GenerateWorkspaceAppService {
    constructor(
        private readonly stepMessage: StepMessageAppService,
        private readonly generateWorkspaceStructure: GenerateWorkspaceStructureAppService,
        private readonly simpleMessage: SimpleMessageAppService
    ) {
    }

    run(): boolean {
        this.stepMessage.write("Generate Workspace");
        if (this.generateWorkspaceStructure.generate()) return true;
        this.simpleMessage.writeError("Failed to generate workspace!");
        return false;
    }
}

// todo: done