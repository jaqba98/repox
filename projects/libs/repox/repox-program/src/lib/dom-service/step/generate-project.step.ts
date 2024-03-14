import {singleton} from "tsyringe";

import {ComplexMessageAppService, StepMessageAppService} from "@lib/logger";
import {RunGenerateProjectAppService} from "@lib/repox-workspace";

import {generateProjectStepMsg} from "../../const/message/step-message.const";
import {failedToGenerateProjectErrorMsg} from "../../const/message/error-message.enum";

@singleton()
/**
 * The step service is responsible for generating project.
 */
export class GenerateProjectStep {
    constructor(
        private readonly stepMessage: StepMessageAppService,
        private readonly runGenerateProject: RunGenerateProjectAppService,
        private readonly complexMessage: ComplexMessageAppService
    ) {
    }

    run(name: string, path: string, type: string): boolean {
        this.stepMessage.write(generateProjectStepMsg());
        if (this.runGenerateProject.run(name, type, path)) return true;
        this.complexMessage.writeError([
            failedToGenerateProjectErrorMsg()
        ]);
        return false;
    }
}
