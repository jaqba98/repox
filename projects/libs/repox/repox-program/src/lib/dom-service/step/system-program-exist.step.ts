import {singleton} from "tsyringe";

import {SimpleMessageAppService, StepMessageAppService} from "@lib/logger";

import {SystemProgramEnum} from "../../enum/system-program/system-program.enum";
import {systemProgramExist} from "../../const/message/step-message.const";
import {
    SystemProgramExistService
} from "../../infrastructure/system-program-exist.service";
import {SystemProgramUrlEnum} from "../../enum/system-program/system-program-url.enum";
import {systemProgramNotExist} from "../../const/message/error-message.enum";
import {
    moreInfoLookThroughOurDocs,
    systemProgramNotExistResolveThisIssue
} from "../../const/message/warning-message.const";

@singleton()
/**
 * The step service is responsible for checking whether the system program exist.
 */
export class SystemProgramExistStep {
    constructor(
        private readonly stepMessage: StepMessageAppService,
        private readonly systemProgramExist: SystemProgramExistService,
        private readonly simpleMessage: SimpleMessageAppService
    ) {
    }

    run(systemProgram: SystemProgramEnum): boolean {
        this.stepMessage.write(systemProgramExist(systemProgram));
        if (this.systemProgramExist.checkExist(systemProgram)) return true;
        const url = SystemProgramUrlEnum[systemProgram];
        this.simpleMessage.writeError(systemProgramNotExist(systemProgram));
        this.simpleMessage.writeWarning(systemProgramNotExistResolveThisIssue(url));
        this.simpleMessage.writeWarning(moreInfoLookThroughOurDocs());
        return true;
    }
}
