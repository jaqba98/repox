import {singleton} from "tsyringe";

import {GetProcessArgvService} from "../infrastructure/get-process-argv.service";
import {ParamDtoDirector} from "../dom-service/director/param-dto.director";
import {ParamDtoValidationDirector} from "../dom-service/director/param-dto-validation.director";
import {ParamDtoBuilder} from "../dom-service/builder/param-dto/param-dto.builder";
import {ProgramValidationBuilder} from "../dom-service/builder/param-dto-validation/program-validation.builder";
import {CommandValidationBuilder} from "../dom-service/builder/param-dto-validation/command-validation.builder";
import {
    ProgramArgumentsValidationBuilder
} from "../dom-service/builder/param-dto-validation/program-arguments-validation.builder";
import {
    CommandArgumentsValidationBuilder
} from "../dom-service/builder/param-dto-validation/command-arguments-validation.builder";
import {ParamDtoStore} from "../dom-service/store/param-dto.store";

@singleton()
/**
 * This application service builds a validated
 * parameter DTO model.
 */
export class BuildParamDtoApp {
    constructor(
        private readonly getProcessArgv: GetProcessArgvService,
        private readonly paramDtoDirector: ParamDtoDirector,
        private readonly paramDtoValidDirector: ParamDtoValidationDirector,
        private readonly paramDtoStore: ParamDtoStore
    ) {
    }

    build(): boolean {
        const argv = this.getProcessArgv.get();
        const paramDto = this.paramDtoDirector.build(ParamDtoBuilder, argv);
        const program = this.paramDtoValidDirector.build(ProgramValidationBuilder, paramDto);
        const command = this.paramDtoValidDirector.build(CommandValidationBuilder, paramDto);
        const programArguments = this.paramDtoValidDirector.build(ProgramArgumentsValidationBuilder, paramDto);
        const commandArguments = this.paramDtoValidDirector.build(CommandArgumentsValidationBuilder, paramDto);
        this.paramDtoStore.set(paramDto)
        console.log(paramDto, program, command, programArguments, commandArguments);
        return true;
    }
}

// todo: refactor the code
