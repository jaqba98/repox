import {singleton} from "tsyringe";

import {StepMessageAppService} from "@lib/logger";

@singleton()
/**
 * This app service is responsible for generating workspace content.
 */
export class GenerateWorkspaceAppService {
    constructor(private readonly stepMessage: StepMessageAppService) {
    }

    run(): boolean {
        this.stepMessage.write("Generate Workspace");
        // todo: I am here 1
        return true;
    }
}
