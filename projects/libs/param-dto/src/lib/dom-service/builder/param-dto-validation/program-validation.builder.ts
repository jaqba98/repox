import {container, singleton} from "tsyringe";

import {ParamDtoValidation} from "../../domain/param-dto-validation";
import {ParamDtoValidationAbstractBuilder} from "./param-dto-validation-abstract.builder";
import {ParamDto} from "../../domain/param-dto";
import {CheckBaseValueService} from "../../service/check-base-value.service";

@singleton()
/**
 * The builder contains methods to build validation steps to the program.
 */
export class ProgramValidationBuilder implements ParamDtoValidationAbstractBuilder {
    readonly paramDtoValid: ParamDtoValidation;

    constructor(private readonly checkBaseValue: CheckBaseValueService) {
        this.paramDtoValid = container.resolve(ParamDtoValidation);
    }

    buildSupportedSignsValid(paramDto: ParamDto): ProgramValidationBuilder {
        const {baseValue, index} = paramDto.program;
        if (baseValue === "" && index === -1) return this;
        if (this.checkBaseValue.checkBaseBaseValueSupportedSigns(baseValue)) return this;
        this.paramDtoValid.supportedSigns = false;
        this.paramDtoValid.supportedSignsWrongIndexes = [index];
        return this;
    }

    buildCorrectPatternValid(paramDto: ParamDto): ProgramValidationBuilder {
        const {baseValue, index} = paramDto.program;
        if (baseValue === "" && index === -1) return this;
        if (this.checkBaseValue.checkBaseBaseValueCorrectPattern(baseValue)) return this;
        this.paramDtoValid.correctPattern = false;
        this.paramDtoValid.correctPatternWrongIndexes = [index];
        return this;
    }

    buildCanExistValid(_paramDto: ParamDto): ProgramValidationBuilder {
        return this;
    }

    buildCorrectOrderValid(paramDto: ParamDto): ProgramValidationBuilder {
        const {baseValue, index} = paramDto.program;
        if (baseValue === "" && index === -1) return this;
        if (baseValue !== "" && index === 0) return this;
        this.paramDtoValid.correctOrder = false;
        this.paramDtoValid.correctOrderWrongIndexes = [index];
        return this;
    }

    build(): ParamDtoValidation {
        return this.paramDtoValid;
    }
}
// todo: refactor the code