import {singleton} from "tsyringe";

import {SimpleMessageAppService, StepMessageAppService} from "@lib/logger";
import {SystemProgramEnum} from "../enum/system-program.enum";
import {SystemProgramExistService} from "../infrastructure/system-program-exist.service";
import {SystemProgramUrlEnum} from "../enum/system-program-url.enum";

@singleton()
/**
 * The app service is responsible for checking whether the system program exist.
 */
export class SystemProgramExistAppService {
    constructor(
        private readonly stepMessage: StepMessageAppService,
        private readonly simpleMessage: SimpleMessageAppService,
        private readonly systemProgramExist: SystemProgramExistService
    ) {
    }

    run(systemProgram: SystemProgramEnum): boolean {
        this.stepMessage.write("System Program Exist");
        if (this.systemProgramExist.checkExist(systemProgram)) return true;
        const url = SystemProgramUrlEnum[systemProgram];
        this.simpleMessage.writeError(`The ${systemProgram} program does not exist on the system!`);
        this.simpleMessage.writeWarning("To resolve this issue, follow these steps:");
        this.simpleMessage.writeWarning(`1) Go to ${url} website`);
        this.simpleMessage.writeWarning("2) Download and then install the program on your system");
        return false;
    }
}
