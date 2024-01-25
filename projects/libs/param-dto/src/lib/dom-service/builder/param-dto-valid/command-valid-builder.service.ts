import {container, singleton} from "tsyringe";

import {ParamDtoValidService} from "../../service/param-dto-valid.service";
import {ParamDtoValidBuilderAbstractService} from "./param-dto-valid-builder-abstract.service";
import {ParamDtoService} from "../../service/param-dto.service";
import {CheckBaseValueService} from "../../service/check-base-value.service";

@singleton()
/**
 * The builder contains methods to build validation steps to the command.
 */
export class CommandValidBuilderService implements ParamDtoValidBuilderAbstractService {
    readonly paramDtoValid: ParamDtoValidService;

    constructor(private readonly checkBaseValue: CheckBaseValueService) {
        this.paramDtoValid = container.resolve(ParamDtoValidService);
    }

    buildSupportedSignsValid(paramDto: ParamDtoService): CommandValidBuilderService {
        const {baseValue, index} = paramDto.command;
        if (baseValue === "" && index === -1) return this;
        if (this.checkBaseValue.checkBaseBaseValueSupportedSigns(baseValue)) return this;
        this.paramDtoValid.supportedSigns = false;
        this.paramDtoValid.supportedSignsWrongIndexes = [index];
        return this;
    }

    buildCorrectPatternValid(paramDto: ParamDtoService): CommandValidBuilderService {
        const {baseValue, index} = paramDto.command;
        if (baseValue === "" && index === -1) return this;
        if (this.checkBaseValue.checkBaseBaseValueCorrectPattern(baseValue)) return this;
        this.paramDtoValid.correctPattern = false;
        this.paramDtoValid.correctPatternWrongIndexes = [index];
        return this;
    }

    buildCanExistValid(paramDto: ParamDtoService): CommandValidBuilderService {
        const {baseValue, index} = paramDto.program;
        if (baseValue === "" && index === -1) {
            this.paramDtoValid.canExist = false;
            this.paramDtoValid.canExistWrongIndexes = [paramDto.command.index];
        }
        return this;
    }

    buildCorrectOrderValid(paramDto: ParamDtoService): CommandValidBuilderService {
        const {baseValue, index} = paramDto.command;
        if (baseValue === "" && index === -1) return this;
        if (baseValue !== "" && index > paramDto.program.index) return this;
        this.paramDtoValid.correctOrder = false;
        this.paramDtoValid.correctOrderWrongIndexes = [index];
        return this;
    }

    build(): ParamDtoValidService {
        return this.paramDtoValid;
    }
}
