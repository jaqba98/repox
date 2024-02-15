import {singleton} from "tsyringe";

import {StepMessageAppService} from "@lib/logger";

@singleton()
/**
 * This app service is responsible for generating workspace structure.
 */
export class GenerateWorkspaceAppService {
    constructor(private readonly stepMessage: StepMessageAppService) {
    }

    run(): boolean {
        this.stepMessage.write("Generate Workspace");
        // if (this.runGenerateWorkspace.run(WORKSPACE_STRUCTURE.structure, EMPTY_STRING, workspaceName)) return true;
        // this.simpleMessage.writeError("Failed to generate workspace!");
        return true;
    }
}

// todo: refactor the code