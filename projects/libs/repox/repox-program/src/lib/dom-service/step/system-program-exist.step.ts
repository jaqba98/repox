import {singleton} from "tsyringe";

import {
    NewlineAppService,
    SimpleMessageAppService,
    StepMessageAppService
} from "@lib/logger";

import {SystemProgramEnum} from "../../enum/system-program/system-program.enum";
import {systemProgramExistMsg} from "../../const/message/step-message.const";
import {
    SystemProgramExistService
} from "../../infrastructure/system-program-exist.service";
import {SystemProgramUrlEnum} from "../../enum/system-program/system-program-url.enum";
import {systemProgramNotExistMsg} from "../../const/message/error-message.enum";
import {
    moreInfoLookThroughOurDocsMsg,
    systemProgramNotExistResolveThisIssueMsg
} from "../../const/message/warning-message.const";

@singleton()
/**
 * The step service is responsible for checking whether the system program exist.
 */
export class SystemProgramExistStep {
    constructor(
        private readonly stepMessage: StepMessageAppService,
        private readonly systemProgramExist: SystemProgramExistService,
        private readonly simpleMessage: SimpleMessageAppService,
        private readonly newline: NewlineAppService
    ) {
    }

    run(systemProgram: SystemProgramEnum): boolean {
        this.stepMessage.write(systemProgramExistMsg(systemProgram));
        if (this.systemProgramExist.checkExist(systemProgram)) return true;
        const url = SystemProgramUrlEnum[systemProgram];
        this.simpleMessage.writeError(systemProgramNotExistMsg(systemProgram));
        this.newline.writeNewline();
        this.simpleMessage.writeWarning(systemProgramNotExistResolveThisIssueMsg(url));
        this.newline.writeNewline();
        this.simpleMessage.writeWarning(moreInfoLookThroughOurDocsMsg());
        return true;
    }
}
