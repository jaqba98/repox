import {container, singleton} from "tsyringe";

import {ParamDtoValidService} from "../../service/param-dto-valid.service";
import {ParamDtoValidBuilderAbstractService} from "./param-dto-valid-builder-abstract.service";
import {ParamDtoService} from "../../service/param-dto.service";

@singleton()
/**
 * The builder contains methods to build validation steps to the program.
 */
export class ProgramValidBuilderService implements ParamDtoValidBuilderAbstractService {
    readonly paramDtoValid: ParamDtoValidService;

    constructor() {
        this.paramDtoValid = container.resolve(ParamDtoValidService);
    }

    buildSupportedSignsValid(paramDto: ParamDtoService): ProgramValidBuilderService {
        const { baseValue, index } = paramDto.program;
        if (baseValue === "" && index === -1) return this;
        if (/^[a-zA-Z0-9-]*$/gm.test(baseValue)) return this;
        this.paramDtoValid.supportedSigns = false;
        this.paramDtoValid.supportedSignsWrongIndexes = [index];
        return this;
    }

    buildCorrectPatternValid(_paramDto: ParamDtoService): ProgramValidBuilderService {
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