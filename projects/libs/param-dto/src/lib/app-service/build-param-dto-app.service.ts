import {singleton} from "tsyringe";

import {GetProcessArgvService} from "../infrastructure/get-process-argv.service";
import {ParamDtoDirectorService} from "../dom-service/director/param-dto-director.service";
import {ParamDtoValidDirectorService} from "../dom-service/director/param-dto-valid-director.service";
import {ParamDtoBuilderService} from "../dom-service/builder/param-dto/param-dto-builder.service";
import {ProgramValidBuilderService} from "../dom-service/builder/param-dto-valid/program-valid-builder.service";
import {CommandValidBuilderService} from "../dom-service/builder/param-dto-valid/command-valid-builder.service";
import {
    ProgramArgumentsValidBuilderService
} from "../dom-service/builder/param-dto-valid/program-arguments-valid-builder.service";
import {
    CommandArgumentsValidBuilderService
} from "../dom-service/builder/param-dto-valid/command-arguments-valid-builder.service";

@singleton()
/**
 * This application service builds a validated
 * parameter DTO model.
 */
export class BuildParamDtoAppService {
    constructor(
        private readonly getProcessArgv: GetProcessArgvService,
        private readonly paramDtoDirector: ParamDtoDirectorService,
        private readonly paramDtoValidDirector: ParamDtoValidDirectorService
    ) {
    }

    build(): boolean {
        const argv = this.getProcessArgv.get();
        const paramDto = this.paramDtoDirector.build(ParamDtoBuilderService, argv);
        const programValid = this.paramDtoValidDirector.build(ProgramValidBuilderService);
        const commandValid = this.paramDtoValidDirector.build(CommandValidBuilderService);
        const programArgumentsValid = this.paramDtoValidDirector.build(ProgramArgumentsValidBuilderService);
        const commandArgumentsValid = this.paramDtoValidDirector.build(CommandArgumentsValidBuilderService);
        console.log(paramDto, programValid, commandValid, programArgumentsValid, commandArgumentsValid);
        return true;
    }
}

// todo: refactor the code