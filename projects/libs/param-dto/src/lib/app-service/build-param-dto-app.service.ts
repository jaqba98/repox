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

@singleton()
/**
 * The app service builds and validate param dto model.
 */
export class BuildParamDtoAppService {
    constructor(
        private readonly commandLineArgs: CommandLineArgsService,
        private readonly paramDto: ParamDtoDirector,
        private readonly paramDtoValidation: ParamDtoValidationDirector,
        private readonly paramDtoError: ParamDtoErrorDirector
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
        console.log(programError, commandError, programArgsError, commandArgsError);
        return true;
    }
}

// import {singleton} from "tsyringe";
//
// import {CommandLineArgsService} from "../infrastructure/command-line-args.service";
// import {ParamDtoDirector} from "../dom-service/director/param-dto.director";
// import {ParamDtoValidationDirector} from "../dom-service/director/param-dto-validation.director";
// import {ParamDtoBuilder} from "../dom-service/builder/param-dto/param-dto.builder";
// import {ProgramValidationBuilder} from "../dom-service/builder/param-dto-validation/program-validation.builder";
// import {CommandValidationBuilder} from "../dom-service/builder/param-dto-validation/command-validation.builder";
// import {
//     ProgramArgumentsValidationBuilder
// } from "../dom-service/builder/param-dto-validation/program-arguments-validation.builder";
// import {
//     CommandArgumentsValidationBuilder
// } from "../dom-service/builder/param-dto-validation/command-arguments-validation.builder";
// import {ParamDtoStore} from "../dom-service/store/param-dto.store";
// import {ParamDtoErrorDirector} from "../dom-service/director/param-dto-error.director";
// import {ProgramErrorBuilder} from "../dom-service/builder/param-dto-error/program-error.builder";
// import {CommandErrorBuilder} from "../dom-service/builder/param-dto-error/command-error.builder";
// import {ProgramArgsErrorBuilder} from "../dom-service/builder/param-dto-error/program-arguments-error.builder";
// import {CommandArgsErrorBuilder} from "../dom-service/builder/param-dto-error/command-arguments-error.builder";
// import {CombineParamDtoErrorsService} from "../dom-service/service/combine-param-dto-errors.service";
// import {ParamErrorMessageAppService} from "@lib/logger";
// import {REPOX_LOGO} from "@lib/repox-const";
//
// @singleton()
// /**
//  * This application service builds a validated
//  * parameter DTO model.
//  */
// export class BuildParamDtoAppService {
//     constructor(
//         private readonly getProcessArgv: CommandLineArgsService,
//         private readonly paramDtoDirector: ParamDtoDirector,
//         private readonly paramDtoValidDirector: ParamDtoValidationDirector,
//         private readonly paramDtoError: ParamDtoErrorDirector,
//         private readonly paramDtoStore: ParamDtoStore,
//         private readonly combineParamDtoErrors: CombineParamDtoErrorsService,
//         private readonly paramErrorMessage: ParamErrorMessageAppService
//     ) {
//     }
//
//     build(): boolean {
//         const argv = this.getProcessArgv.getUserArguments();
//         const paramDto = this.paramDtoDirector.build(ParamDtoBuilder, argv);
//         const program = this.paramDtoValidDirector.build(ProgramValidationBuilder, paramDto);
//         const command = this.paramDtoValidDirector.build(CommandValidationBuilder, paramDto);
//         const programArguments = this.paramDtoValidDirector.build(ProgramArgumentsValidationBuilder, paramDto);
//         const commandArguments = this.paramDtoValidDirector.build(CommandArgumentsValidationBuilder, paramDto);
//         const programErrors = this.paramDtoError.build(ProgramErrorBuilder, program);
//         const commandErrors = this.paramDtoError.build(CommandErrorBuilder, command);
//         const programArgumentsErrors = this.paramDtoError.build(ProgramArgsErrorBuilder, programArguments);
//         const commandArgumentsErrors = this.paramDtoError.build(CommandArgsErrorBuilder, commandArguments);
//         const combine = this.combineParamDtoErrors.combine(
//             [programErrors, commandErrors, programArgumentsErrors, commandArgumentsErrors]
//         );
//         if (combine.length === 0) {
//             this.paramDtoStore.set(paramDto);
//             return true;
//         }
//         const first = combine[0];
//         this.paramErrorMessage.writeParamError(first.wrongParamIndexes, argv, first.errors, first.tips, REPOX_LOGO);
//         return false;
//     }
// }
// todo: refactor the code