import {singleton} from "tsyringe";

import {StepMessageAppService} from "@lib/logger";
import {WorkspaceDomainStore} from "@lib/repox-workspace";

import {checkProjectNotExistStepMsg} from "../../const/message/step-message.const";

@singleton()
/**
 * The step service is responsible for check project not exist in workspace domain model.
 */
export class CheckProjectNotExistStep {
    constructor(
        private readonly stepMessage: StepMessageAppService,
        private readonly store: WorkspaceDomainStore
    ) {
    }

    run(projectName: string): boolean {
        this.stepMessage.write(checkProjectNotExistStepMsg(projectName));
        return !this.store.projectExist(projectName);
    }
}
