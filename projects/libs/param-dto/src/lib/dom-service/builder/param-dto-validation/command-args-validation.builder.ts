import {container} from "tsyringe";

import {ParamDtoValidationDomain} from "../../domain/param-dto-validation.domain";
import {ParamDtoDomain} from "../../domain/param-dto.domain";
import {deepCopy} from "@lib/utils";
import {ParamDtoValidationAbstractBuilder} from "./param-dto-validation-abstract.builder";

export class CommandArgsValidationBuilder implements ParamDtoValidationAbstractBuilder {
    paramDtoValidation: ParamDtoValidationDomain;

    paramDto: ParamDtoDomain | undefined;

    constructor() {
        this.paramDtoValidation = container.resolve(ParamDtoValidationDomain);
    }

    buildParamDto(paramDto: ParamDtoDomain): CommandArgsValidationBuilder {
        this.paramDto = deepCopy(paramDto);
        return this;
    }

    buildSupportedSignsValidation(): CommandArgsValidationBuilder {
        return this;
    }

    buildCorrectPatternValidation(): CommandArgsValidationBuilder {
        return this;
    }

    buildCanExistValidation(): CommandArgsValidationBuilder {
        return this;
    }

    buildCorrectOrderValidation(): CommandArgsValidationBuilder {
        return this;
    }

    build(): ParamDtoValidationDomain {
        return this.paramDtoValidation;
    }
}

// import {container, singleton} from "tsyringe";
//
// import {ParamDtoValidationDomain} from "../../domain/param-dto-validation.domain";
// import {ParamDtoValidationAbstractBuilder} from "./param-dto-validation-abstract.builder";
// import {ParamDtoDomain} from "../../domain/param-dto.domain";
// import {CheckBaseValueService} from "../../service/check-base-value.service";
//
// @singleton()
// /**
//  * The builder contains methods to build validation steps to the command arguments.
//  */
// export class CommandArgumentsValidationBuilder implements ParamDtoValidationAbstractBuilder {
//     readonly paramDtoValid: ParamDtoValidationDomain;
//
//     constructor(private readonly checkBaseValue: CheckBaseValueService) {
//         this.paramDtoValid = container.resolve(ParamDtoValidationDomain);
//     }
//
//     buildSupportedSignsValid(_paramDto: ParamDtoDomain): CommandArgumentsValidationBuilder {
//         // const indexes = paramDto.commandArguments
//         //     .filter(argument => argument.baseValue !== "" && argument.index !== -1)
//         //     .filter(argument => !this.checkBaseValue.checkArgumentsBaseValueSupportedSigns(argument.baseValue))
//         //     .map(argument => argument.index);
//         // if (indexes.length === 0) return this;
//         // this.paramDtoValid.supportedSigns = false;
//         // this.paramDtoValid.supportedSignsWrongIndexes = [...indexes];
//         return this;
//     }
//
//     buildCorrectPatternValid(_paramDto: ParamDtoDomain): CommandArgumentsValidationBuilder {
//         // const indexes = paramDto.commandArguments
//         //     .filter(argument => argument.baseValue !== "" && argument.index !== -1)
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
//     buildCanExistValid(_paramDto: ParamDtoDomain): CommandArgumentsValidationBuilder {
//         // const { baseValue, index } = paramDto.command;
//         // if (baseValue === "" && index === -1) {
//         //     const indexes = paramDto.commandArguments.map(argument => argument.index);
//         //     this.paramDtoValid.canExist = false;
//         //     this.paramDtoValid.canExistWrongIndexes = [...indexes];
//         // }
//         return this;
//     }
//
//     buildCorrectOrderValid(_paramDto: ParamDtoDomain): CommandArgumentsValidationBuilder {
//         // const {index} = paramDto.command;
//         // const indexes = paramDto.commandArguments
//         //     .filter(argument => argument.index <= index)
//         //     .map(argument => argument.index);
//         // if (indexes.length === 0) return this;
//         // this.paramDtoValid.correctOrder = false;
//         // this.paramDtoValid.correctOrderWrongIndexes = [...indexes];
//         return this;
//     }
//
//     build(): ParamDtoValidationDomain {
//         return this.paramDtoValid;
//     }
// }
// todo: refactor the code