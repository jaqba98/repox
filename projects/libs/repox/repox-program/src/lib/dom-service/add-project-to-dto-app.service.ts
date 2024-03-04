import {singleton} from "tsyringe";

import {StepMessageAppService} from "@lib/logger";
import {WorkspaceDtoStore} from "@lib/repox-workspace";

@singleton()
/**
 * The app service is responsible for adding new project
 * to the dto model.
 */
export class AddProjectToDtoAppService {
    constructor(
        private readonly stepMessage: StepMessageAppService,
        private readonly workspaceDtoStore: WorkspaceDtoStore
    ) {
    }

    run(projectName: string, projectPath: string): boolean {
        this.stepMessage.write("Add Project to DTO");
        // this.workspaceDtoStore.addProjectToRepoxJson(projectName, projectPath);
        return true;
    }
}
