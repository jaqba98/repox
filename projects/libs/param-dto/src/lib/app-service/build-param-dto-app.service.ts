import {singleton} from "tsyringe";

import {GetProcessArgvService} from "../infrastructure/get-process-argv.service";
import {ParamDtoDirectorService} from "../dom-service/director/param-dto-director.service";

@singleton()
/**
 * This application service builds a validated
 * parameter DTO model.
 */
export class BuildParamDtoAppService {
    constructor(
        private readonly getProcessArgv: GetProcessArgvService,
        private readonly paramDtoDirector: ParamDtoDirectorService
    ) {
    }

    build(): boolean {
        const argv = this.getProcessArgv.get();
        const paramDto = this.paramDtoDirector.buildParamDto(argv);
        console.log(paramDto);
        return true;
    }
}

// todo: refactor the code