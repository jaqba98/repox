import "core-js/features/reflect";
import {container, singleton} from "tsyringe";

import {BuildParamDtoAppService} from "@lib/param-dto";
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
        private readonly programLauncher: RepoxProgramLauncher
    ) {
    }

    run(): void {
        if (!this.buildParamDto.build()) return;
        if (!this.buildParamDomain.build()) return;
        if (!this.programLauncher.launchProgram()) return;
    }
}

container.resolve(RepoxMainService).run();
