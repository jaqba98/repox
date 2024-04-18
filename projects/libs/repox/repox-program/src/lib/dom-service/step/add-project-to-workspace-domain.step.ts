import { singleton } from "tsyringe";

import { StepMessageAppService } from "@lib/logger";
import { WorkspaceDomainStore } from "@lib/repox-workspace";

import { addProjectToWorkspaceDomainStepMsg } from "../../const/message/step-message.const";

@singleton()
/**
 * The step service is responsible for adding project to the workspace domain.
 */
export class AddProjectToWorkspaceDomainStep {
    constructor (
    private readonly stepMessage: StepMessageAppService,
    private readonly store: WorkspaceDomainStore
    ) {
    }

    run (name: string, root: string, src: string, type: string): boolean {
        this.stepMessage.write(addProjectToWorkspaceDomainStepMsg(name));
        // this.store.addProject(name, root, src, type)
        return true;
    }
}
