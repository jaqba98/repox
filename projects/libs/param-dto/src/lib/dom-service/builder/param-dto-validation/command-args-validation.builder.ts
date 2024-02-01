import {container, singleton} from "tsyringe";

import {ParamDtoValidationDomain} from "../../domain/param-dto-validation.domain";
import {ParamDtoDomain} from "../../domain/param-dto.domain";
import {deepCopy} from "@lib/utils";
import {ParamDtoValidationAbstractBuilder} from "./param-dto-validation-abstract.builder";

@singleton()
/**
 * The builder contains methods to build validation steps to the command args.
 */
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
        const command = this.paramDto?.command;
        const commandArgs = this.paramDto?.commandArgs;
        if (!command && commandArgs) {
            const indexes = commandArgs.map(arg => arg.index);
            this.paramDtoValidation.canExist = false;
            this.paramDtoValidation.canExistWrongIndexes = deepCopy(indexes);
        }
        return this;
    }

    buildCorrectOrderValidation(): CommandArgsValidationBuilder {
        const commandArgs = this.paramDto?.commandArgs;
        if (!commandArgs) return this;
        const command = this.paramDto?.command;
        if (!command) {
            const wrongIndexes = commandArgs.map(arg => arg.index);
            this.paramDtoValidation.correctOrder = false;
            this.paramDtoValidation.correctOrderWrongIndexes = deepCopy(wrongIndexes);
            return this;
        }
        const {index} = command;
        const wrongIndexes = commandArgs
            .filter(arg => arg.index <= index)
            .map(arg => arg.index);
        if (wrongIndexes.length > 0) {
            this.paramDtoValidation.correctOrder = false;
            this.paramDtoValidation.correctOrderWrongIndexes = deepCopy(wrongIndexes);
        }
        return this;
    }

    build(): ParamDtoValidationDomain {
        return this.paramDtoValidation;
    }
}

// export class CommandArgumentsValidationBuilder implements ParamDtoValidationAbstractBuilder {
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
// }
// todo: refactor the code