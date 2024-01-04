import {singleton} from "tsyringe";

import {SimpleMessageAppService, StepMessageAppService} from "@lib/logger";
import {WorkspaceFolderStructureService} from "@lib/repox-workspace";

@singleton()
/**
 * This app service is responsible for generating workspace content.
 */
export class GenerateWorkspaceAppService {
    constructor(
        private readonly stepMessage: StepMessageAppService,
        private readonly workspaceFolderStructure: WorkspaceFolderStructureService,
        private readonly simpleMessage: SimpleMessageAppService
    ) {
    }

    run(): boolean {
        this.stepMessage.write("Generate Workspace");
        if (this.workspaceFolderStructure.generateStructure()) return true;
        // todo: I am here
        this.simpleMessage.writeError("An error occurred while generating the workspace structure!");
        return false;
    }
}
