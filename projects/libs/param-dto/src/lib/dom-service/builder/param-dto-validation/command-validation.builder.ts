import {container, singleton} from "tsyringe";

import {ParamDtoValidation} from "../../domain/param-dto-validation";
import {ParamDtoValidationAbstractBuilder} from "./param-dto-validation-abstract.builder";
import {ParamDto} from "../../domain/param-dto";
import {CheckBaseValueService} from "../../service/check-base-value.service";

@singleton()
/**
 * The builder contains methods to build validation steps to the command.
 */
export class CommandValidationBuilder implements ParamDtoValidationAbstractBuilder {
    readonly paramDtoValid: ParamDtoValidation;

    constructor(private readonly checkBaseValue: CheckBaseValueService) {
        this.paramDtoValid = container.resolve(ParamDtoValidation);
    }

    buildSupportedSignsValid(paramDto: ParamDto): CommandValidationBuilder {
        const {baseValue, index} = paramDto.command;
        if (baseValue === "" && index === -1) return this;
        if (this.checkBaseValue.checkBaseBaseValueSupportedSigns(baseValue)) return this;
        this.paramDtoValid.supportedSigns = false;
        this.paramDtoValid.supportedSignsWrongIndexes = [index];
        return this;
    }

    buildCorrectPatternValid(paramDto: ParamDto): CommandValidationBuilder {
        const {baseValue, index} = paramDto.command;
        if (baseValue === "" && index === -1) return this;
        if (this.checkBaseValue.checkBaseBaseValueCorrectPattern(baseValue)) return this;
        this.paramDtoValid.correctPattern = false;
        this.paramDtoValid.correctPatternWrongIndexes = [index];
        return this;
    }

    buildCanExistValid(paramDto: ParamDto): CommandValidationBuilder {
        const {baseValue, index} = paramDto.program;
        if (baseValue === "" && index === -1) {
            this.paramDtoValid.canExist = false;
            this.paramDtoValid.canExistWrongIndexes = [paramDto.command.index];
        }
        return this;
    }

    buildCorrectOrderValid(paramDto: ParamDto): CommandValidationBuilder {
        const {baseValue, index} = paramDto.command;
        if (baseValue === "" && index === -1) return this;
        if (baseValue !== "" && index > paramDto.program.index) return this;
        this.paramDtoValid.correctOrder = false;
        this.paramDtoValid.correctOrderWrongIndexes = [index];
        return this;
    }

    build(): ParamDtoValidation {
        return this.paramDtoValid;
    }
}
// todo: refactor the code