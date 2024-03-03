import {singleton} from "tsyringe";

import {ComplexMessageAppService, StepMessageAppService} from "@lib/logger";

import {SystemProgramEnum} from "../../enum/system-program/system-program.enum";
import {
    SystemProgramExistService
} from "../../infrastructure/system-program-exist.service";
import {SystemProgramUrlEnum} from "../../enum/system-program/system-program-url.enum";
import {systemProgramExistStepMsg} from "../../const/message/step-message.const";
import {
    systemProgramNotExistInSystemErrorMsg
} from "../../const/message/error-message.enum";
import {
    installAndRunAgainWarningMsg,
    linkToProgramWarningMsg
} from "../../const/message/warning-message.const";

@singleton()
/**
 * The step service is responsible for checking whether the system program exist.
 */
export class SystemProgramExistStep {
    constructor(
        private readonly stepMessage: StepMessageAppService,
        private readonly systemProgramExist: SystemProgramExistService,
        private readonly complexMessage: ComplexMessageAppService
    ) {
    }

    run(systemProgram: SystemProgramEnum): boolean {
        this.stepMessage.write(systemProgramExistStepMsg(systemProgram));
        if (this.systemProgramExist.checkExist(systemProgram)) return true;
        const url = SystemProgramUrlEnum[systemProgram];
        this.complexMessage.writeError([
            systemProgramNotExistInSystemErrorMsg(systemProgram)
        ]);
        this.complexMessage.writeWarning([
            installAndRunAgainWarningMsg(systemProgram),
            linkToProgramWarningMsg(systemProgram, url)
        ]);
        return true;
    }
}
