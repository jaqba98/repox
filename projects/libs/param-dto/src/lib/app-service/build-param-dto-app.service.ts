import {singleton} from "tsyringe";

import {GetProcessArgvService} from "../infrastructure/get-process-argv.service";
import {ParamDtoBuilderService} from "../dom-service/builder/param-dto-builder.service";

@singleton()
/**
 * This application service builds a validated
 * parameter DTO model.
 */
export class BuildParamDtoAppService {
    constructor(
        private readonly getProcessArgv: GetProcessArgvService,
        private readonly paramDtoBuilder: ParamDtoBuilderService
    ) {
    }

    build(): boolean {
        const argv = this.getProcessArgv.get();
        const paramDto = this.paramDtoBuilder
            .buildBaseArguments(argv)
            .buildExecPath()
            .buildAppPath()
            .buildProgram()
            .buildCommand()
            .buildProgramArguments()
            .buildCommandArguments()
            .build();
        console.log(paramDto);
        return true;
    }
}

// todo: refactor the code