import {container, singleton} from "tsyringe";

import {ParamDtoValidation} from "../../domain/param-dto-validation";
import {ParamDtoValidationAbstractBuilder} from "./param-dto-validation-abstract.builder";
import {ParamDtoDomain} from "../../domain/param-dto.domain";
import {CheckBaseValueService} from "../../service/check-base-value.service";

@singleton()
/**
 * The builder contains methods to build validation steps to the program arguments.
 */
export class ProgramArgumentsValidationBuilder implements ParamDtoValidationAbstractBuilder {
    readonly paramDtoValid: ParamDtoValidation;

    constructor(private readonly checkBaseValue: CheckBaseValueService) {
        this.paramDtoValid = container.resolve(ParamDtoValidation);
    }

    buildSupportedSignsValid(paramDto: ParamDtoDomain): ProgramArgumentsValidationBuilder {
        const indexes = paramDto.programArguments
            .filter(argument => argument.baseValue !== "" && argument.index !== -1)
            .filter(argument => !this.checkBaseValue.checkArgumentsBaseValueSupportedSigns(argument.baseValue))
            .map(argument => argument.index);
        if (indexes.length === 0) return this;
        this.paramDtoValid.supportedSigns = false;
        this.paramDtoValid.supportedSignsWrongIndexes = [...indexes];
        return this;
    }

    buildCorrectPatternValid(paramDto: ParamDtoDomain): ProgramArgumentsValidationBuilder {
        const indexes = paramDto.programArguments
            .filter(argument => argument.baseValue !== "" && argument.index !== -1)
            .filter(argument => !/^[a-zA-Z][a-zA-Z0-9-]*$/gm.test(argument.baseValue))
            .filter(argument => !this.checkBaseValue.checkArgumentsBaseValueCorrectPattern(
                argument.baseValue, argument.hasValue, argument.isAlias
            ))
            .map(argument => argument.index);
        if (indexes.length === 0) return this;
        this.paramDtoValid.correctPattern = false;
        this.paramDtoValid.correctPatternWrongIndexes = [...indexes];
        return this;
    }

    buildCanExistValid(_paramDto: ParamDtoDomain): ProgramArgumentsValidationBuilder {
        return this;
    }

    buildCorrectOrderValid(paramDto: ParamDtoDomain): ProgramArgumentsValidationBuilder {
        const {index} = paramDto.program;
        const indexes = paramDto.programArguments
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