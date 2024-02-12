import "core-js/features/reflect";
import {container, singleton} from "tsyringe";

import {BuildParamDtoAppService} from "@lib/param-dto";
import {SimpleMessageAppService} from "@lib/logger";
import {BuildParamDomainAppService} from "@lib/param-domain";
import {RepoxProgramLauncher} from "@lib/repox-program";

@singleton()
/**
 * The main service runs the repox program.
 */
export class RepoxMainService {
    constructor(
        private readonly buildParamDto: BuildParamDtoAppService,
        private readonly buildParamDomain: BuildParamDomainAppService,
        private readonly simpleMessage: SimpleMessageAppService,
        private readonly repoxLauncher: RepoxProgramLauncher
    ) {
    }

    run(): void {
        if (!this.buildParamDto.build()) return;
        if (!this.buildParamDomain.build()) return;
        if (!this.repoxLauncher.launchProgram()) return;
        this.simpleMessage.writeSuccess("Command completed correctly!");
    }
}

container.resolve(RepoxMainService).run();
