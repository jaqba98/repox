import {container, singleton} from "tsyringe";

import {ParamDtoValidService} from "../../service/param-dto-valid.service";
import {ParamDtoValidBuilderAbstractService} from "./param-dto-valid-builder-abstract.service";
import {ParamDtoService} from "../../service/param-dto.service";
import {CheckBaseValueService} from "../../service/check-base-value.service";

@singleton()
/**
 * The builder contains methods to build validation steps to the program.
 */
export class ProgramValidBuilderService implements ParamDtoValidBuilderAbstractService {
    readonly paramDtoValid: ParamDtoValidService;

    constructor(private readonly checkBaseValue: CheckBaseValueService) {
        this.paramDtoValid = container.resolve(ParamDtoValidService);
    }

    buildSupportedSignsValid(paramDto: ParamDtoService): ProgramValidBuilderService {
        const {baseValue, index} = paramDto.program;
        if (baseValue === "" && index === -1) return this;
        if (this.checkBaseValue.checkBaseBaseValueSupportedSigns(baseValue)) return this;
        this.paramDtoValid.supportedSigns = false;
        this.paramDtoValid.supportedSignsWrongIndexes = [index];
        return this;
    }

    buildCorrectPatternValid(paramDto: ParamDtoService): ProgramValidBuilderService {
        const {baseValue, index} = paramDto.program;
        if (baseValue === "" && index === -1) return this;
        if (this.checkBaseValue.checkBaseBaseValueCorrectPattern(baseValue)) return this;
        this.paramDtoValid.correctPattern = false;
        this.paramDtoValid.correctPatternWrongIndexes = [index];
        return this;
    }

    buildCanExistValid(_paramDto: ParamDtoService): ProgramValidBuilderService {
        return this;
    }

    buildCorrectOrderValid(_paramDto: ParamDtoService): ProgramValidBuilderService {
        return this;
    }

    build(): ParamDtoValidService {
        return this.paramDtoValid;
    }
}

// todo: refactor the code
