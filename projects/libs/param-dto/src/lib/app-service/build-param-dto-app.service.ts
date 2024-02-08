import {singleton} from "tsyringe";

import {CommandLineArgsService} from "../infrastructure/command-line-args.service";
import {ParamDtoDirector} from "../dom-service/director/param-dto.director";
import {ParamDtoBuilder} from "../dom-service/builder/param-dto/param-dto.builder";
import {
    ParamDtoValidationDirector
} from "../dom-service/director/param-dto-validation.director";
import {
    ProgramValidationBuilder
} from "../dom-service/builder/param-dto-validation/program-validation.builder";
import {
    CommandValidationBuilder
} from "../dom-service/builder/param-dto-validation/command-validation.builder";
import {
    ProgramArgsValidationBuilder
} from "../dom-service/builder/param-dto-validation/program-args-validation.builder";
import {
    CommandArgsValidationBuilder
} from "../dom-service/builder/param-dto-validation/command-args-validation.builder";
import {ParamDtoErrorDirector} from "../dom-service/director/param-dto-error.director";
import {
    ProgramErrorBuilder
} from "../dom-service/builder/param-dto-error/program-error.builder";
import {
    CommandErrorBuilder
} from "../dom-service/builder/param-dto-error/command-error.builder";
import {
    ProgramArgsErrorBuilder
} from "../dom-service/builder/param-dto-error/program-args-error.builder";
import {
    CommandArgsErrorBuilder
} from "../dom-service/builder/param-dto-error/command-args-error.builder";
import {
    MergeParamDtoErrorsService
} from "../dom-service/service/merge-param-dto-errors.service";
import {ParamErrorMessageAppService} from "@lib/logger";
import {REPOX_LOGO} from "@lib/repox-const";

@singleton()
/**
 * The app service builds and validate param dto model.
 */
export class BuildParamDtoAppService {
    constructor(
        private readonly commandLineArgs: CommandLineArgsService,
        private readonly paramDto: ParamDtoDirector,
        private readonly paramDtoValidation: ParamDtoValidationDirector,
        private readonly paramDtoError: ParamDtoErrorDirector,
        private readonly mergeParamDtoErrors: MergeParamDtoErrorsService,
        private readonly paramErrorMessage: ParamErrorMessageAppService
    ) {
    }

    build(): boolean {
        // Get arguments provided by user.
        const userArgs = this.commandLineArgs.getUserArgs();
        // Build the param dto object.
        const paramDto = this.paramDto.build(ParamDtoBuilder, userArgs);
        // Build the param dto validation objects.
        const programValidation = this.paramDtoValidation
            .build(ProgramValidationBuilder, paramDto);
        const commandValidation = this.paramDtoValidation
            .build(CommandValidationBuilder, paramDto);
        const programArgsValidation = this.paramDtoValidation
            .build(ProgramArgsValidationBuilder, paramDto);
        const commandArgsValidation = this.paramDtoValidation
            .build(CommandArgsValidationBuilder, paramDto);
        // Build the param dto error object.
        const programError = this.paramDtoError
            .build(ProgramErrorBuilder, programValidation);
        const commandError = this.paramDtoError
            .build(CommandErrorBuilder, commandValidation);
        const programArgsError = this.paramDtoError
            .build(ProgramArgsErrorBuilder, programArgsValidation);
        const commandArgsError = this.paramDtoError
            .build(CommandArgsErrorBuilder, commandArgsValidation);
        // Merge the param dto errors.
        const mergeErrors = this.mergeParamDtoErrors.merge([
            programError, commandError, programArgsError, commandArgsError
        ]);
        // Return the result of the process.
        if (mergeErrors.length === 0) {
            return true;
        }
        const firstError = mergeErrors[0];
        this.paramErrorMessage.writeParamError(
            firstError.wrongParamIndexes,
            userArgs,
            firstError.errors,
            firstError.tips,
            REPOX_LOGO
        );
        return false;
    }
}
// todo: refactor the code