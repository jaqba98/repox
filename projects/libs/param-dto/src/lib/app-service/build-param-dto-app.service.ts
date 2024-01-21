import {singleton} from "tsyringe";

import {GetProcessArgvService} from "../infrastructure/get-process-argv.service";
import {ParamDtoDirectorService} from "../dom-service/director/param-dto-director.service";
import {ParamDtoValidationDirectorService} from "../dom-service/director/param-dto-validation-director.service";

@singleton()
/**
 * This application service builds a validated
 * parameter DTO model.
 */
export class BuildParamDtoAppService {
    constructor(
        private readonly getProcessArgv: GetProcessArgvService,
        private readonly paramDtoDirector: ParamDtoDirectorService,
        private readonly paramDtoValidationDirector: ParamDtoValidationDirectorService
    ) {
    }

    build(): boolean {
        const argv = this.getProcessArgv.get();
        const paramDto = this.paramDtoDirector.build(argv);
        // todo: I am here
        const programValidation = this.paramDtoValidationDirector.buildProgramValidation(paramDto);
        const commandValidation = this.paramDtoValidationDirector.buildCommandValidation(paramDto);
        const programArgumentsValidation = this.paramDtoValidationDirector.buildProgramArgumentsValidation(paramDto);
        const commandArgumentsValidation = this.paramDtoValidationDirector.buildCommandArgumentsValidation(paramDto);
        console.log(programValidation, commandValidation, programArgumentsValidation, commandArgumentsValidation);
        return true;
    }
}

// todo: refactor the code