import {container, singleton} from "tsyringe";

import {ParamDtoValidationDomain} from "../../domain/param-dto-validation.domain";
import {ParamDtoDomain} from "../../domain/param-dto.domain";
import {deepCopy} from "@lib/utils";
import {ParamDtoValidationAbstractBuilder} from "./param-dto-validation-abstract.builder";

@singleton()
/**
 * The builder contains methods to build validation steps to the program args.
 */
export class ProgramArgsValidationBuilder implements ParamDtoValidationAbstractBuilder {
    paramDtoValidation: ParamDtoValidationDomain;

    paramDto: ParamDtoDomain | undefined;

    constructor() {
        this.paramDtoValidation = container.resolve(ParamDtoValidationDomain);
    }

    buildParamDto(paramDto: ParamDtoDomain): ProgramArgsValidationBuilder {
        this.paramDto = deepCopy(paramDto);
        return this;
    }

    buildSupportedSignsValidation(): ProgramArgsValidationBuilder {
        return this;
    }

    buildCorrectPatternValidation(): ProgramArgsValidationBuilder {
        return this;
    }

    buildCanExistValidation(): ProgramArgsValidationBuilder {
        return this;
    }

    buildCorrectOrderValidation(): ProgramArgsValidationBuilder {
        return this;
    }

    build(): ParamDtoValidationDomain {
        return this.paramDtoValidation;
    }
}

// export class ProgramArgumentsValidationBuilder implements ParamDtoValidationAbstractBuilder {
//     buildSupportedSignsValid(_paramDto: ParamDtoDomain): ProgramArgumentsValidationBuilder {
//         // const indexes = paramDto.programArguments
//         //     .filter(argument => argument.baseValue !== "" && argument.index !== -1)
//         //     .filter(argument => !this.checkBaseValue.checkArgumentsBaseValueSupportedSigns(argument.baseValue))
//         //     .map(argument => argument.index);
//         // if (indexes.length === 0) return this;
//         // this.paramDtoValid.supportedSigns = false;
//         // this.paramDtoValid.supportedSignsWrongIndexes = [...indexes];
//         return this;
//     }
//
//     buildCorrectPatternValid(_paramDto: ParamDtoDomain): ProgramArgumentsValidationBuilder {
//         // const indexes = paramDto.programArguments
//         //     .filter(argument => argument.baseValue !== "" && argument.index !== -1)
//         //     .filter(argument => !/^[a-zA-Z][a-zA-Z0-9-]*$/gm.test(argument.baseValue))
//         //     .filter(argument => !this.checkBaseValue.checkArgumentsBaseValueCorrectPattern(
//         //         argument.baseValue, argument.hasValue, argument.isAlias
//         //     ))
//         //     .map(argument => argument.index);
//         // if (indexes.length === 0) return this;
//         // this.paramDtoValid.correctPattern = false;
//         // this.paramDtoValid.correctPatternWrongIndexes = [...indexes];
//         return this;
//     }
//
//     buildCorrectOrderValid(_paramDto: ParamDtoDomain): ProgramArgumentsValidationBuilder {
//         // const {index} = paramDto.program;
//         // const indexes = paramDto.programArguments
//         //     .filter(argument => argument.index <= index)
//         //     .map(argument => argument.index);
//         // if (indexes.length === 0) return this;
//         // this.paramDtoValid.correctOrder = false;
//         // this.paramDtoValid.correctOrderWrongIndexes = [...indexes];
//         return this;
//     }
// }
// todo: refactor the code