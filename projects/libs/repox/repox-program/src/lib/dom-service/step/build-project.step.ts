import {singleton} from "tsyringe";

import {StepMessageAppService} from "@lib/logger";
import {WorkspaceDomainStore} from "@lib/repox-workspace";

import {buildProjectStepMsg} from "../../const/message/step-message.const";

@singleton()
/**
 * The step service is responsible for building project to the workspace domain.
 */
export class BuildProjectStep {
    constructor(
        private readonly stepMessage: StepMessageAppService,
        private readonly store: WorkspaceDomainStore
    ) {
    }

    run(name: string): boolean {
        this.stepMessage.write(buildProjectStepMsg(name));
        return true;
    }
}
