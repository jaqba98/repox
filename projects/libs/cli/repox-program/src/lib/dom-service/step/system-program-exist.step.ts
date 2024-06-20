// done
import { singleton } from "tsyringe";

import { StepMessageAppService, ComplexMessageAppService } from "@lib/logger";

import { SystemProgramUrlEnum } from "../../enum/system-program/system-program-url.enum";
import { type SystemProgramEnum } from "../../enum/system-program/system-program.enum";
import { systemProgramDoesNotExistErrorMsg } from "../../const/message/error-message.const";
import { systemProgramExistStepMsg } from "../../const/message/step-message.const";
import { installSystemProgramAndRunAgainWarningMsg, visitSystemProgramPageWarningMsg } from "../../const/message/warning-message.const";
import { SystemProgramExistService } from "../../infrastructure/system-program-exist.service";

@singleton()
/**
 * The step dom-service is responsible for checking
 * whether the system program exist.
 */
export class SystemProgramExistStep {
    constructor (
    private readonly stepMessage: StepMessageAppService,
    private readonly systemProgramExist: SystemProgramExistService,
    private readonly complexMessage: ComplexMessageAppService
    ) {}

    run (systemProgram: SystemProgramEnum): boolean {
        this.stepMessage.write(systemProgramExistStepMsg(systemProgram));
        if (this.systemProgramExist.checkExist(systemProgram)) return true;
        const url = SystemProgramUrlEnum[systemProgram].toString();
        this.complexMessage.writeError([
            systemProgramDoesNotExistErrorMsg(systemProgram)
        ]);
        this.complexMessage.writeWarning([
            installSystemProgramAndRunAgainWarningMsg(systemProgram),
            visitSystemProgramPageWarningMsg(systemProgram, url)
        ]);
        return false;
    }
}
