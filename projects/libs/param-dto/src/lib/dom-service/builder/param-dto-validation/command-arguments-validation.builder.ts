import {container, singleton} from "tsyringe";

import {ParamDtoValidation} from "../../domain/param-dto-validation";
import {ParamDtoValidationAbstractBuilder} from "./param-dto-validation-abstract.builder";
import {ParamDto} from "../../domain/param-dto";
import {CheckBaseValueService} from "../../service/check-base-value.service";

@singleton()
/**
 * The builder contains methods to build validation steps to the command arguments.
 */
export class CommandArgumentsValidationBuilder implements ParamDtoValidationAbstractBuilder {
    readonly paramDtoValid: ParamDtoValidation;

    constructor(private readonly checkBaseValue: CheckBaseValueService) {
        this.paramDtoValid = container.resolve(ParamDtoValidation);
    }

    buildSupportedSignsValid(paramDto: ParamDto): CommandArgumentsValidationBuilder {
        const indexes = paramDto.commandArguments
            .filter(argument => argument.baseValue !== "" && argument.index !== -1)
            .filter(argument => !this.checkBaseValue.checkArgumentsBaseValueSupportedSigns(argument.baseValue))
            .map(argument => argument.index);
        if (indexes.length === 0) return this;
        this.paramDtoValid.supportedSigns = false;
        this.paramDtoValid.supportedSignsWrongIndexes = [...indexes];
        return this;
    }

    buildCorrectPatternValid(paramDto: ParamDto): CommandArgumentsValidationBuilder {
        const indexes = paramDto.commandArguments
            .filter(argument => argument.baseValue !== "" && argument.index !== -1)
            .filter(argument => !this.checkBaseValue.checkArgumentsBaseValueCorrectPattern(
                argument.baseValue, argument.hasValue, argument.isAlias
            ))
            .map(argument => argument.index);
        if (indexes.length === 0) return this;
        this.paramDtoValid.correctPattern = false;
        this.paramDtoValid.correctPatternWrongIndexes = [...indexes];
        return this;
    }

    buildCanExistValid(paramDto: ParamDto): CommandArgumentsValidationBuilder {
        const { baseValue, index } = paramDto.command;
        if (baseValue === "" && index === -1) {
            const indexes = paramDto.commandArguments.map(argument => argument.index);
            this.paramDtoValid.canExist = false;
            this.paramDtoValid.canExistWrongIndexes = [...indexes];
        }
        return this;
    }

    buildCorrectOrderValid(paramDto: ParamDto): CommandArgumentsValidationBuilder {
        const {index} = paramDto.command;
        const indexes = paramDto.commandArguments
            .filter(argument => argument.index <= index)
            .map(argument => argument.index);
        if (indexes.length === 0) return this;
        this.paramDtoValid.correctOrder = false;
        this.paramDtoValid.correctOrderWrongIndexes = [...indexes];
        return this;
    }

    build(): ParamDtoValidation {
        return this.paramDtoValid;
    }
}
// todo: refactor the code