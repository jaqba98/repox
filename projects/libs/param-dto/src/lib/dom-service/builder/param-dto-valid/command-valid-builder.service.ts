import {container, singleton} from "tsyringe";

import {ParamDtoValidService} from "../../service/param-dto-valid.service";
import {ParamDtoValidBuilderAbstractService} from "./param-dto-valid-builder-abstract.service";
import {ParamDtoService} from "../../service/param-dto.service";

@singleton()
/**
 * The builder contains methods to build validation steps to the command.
 */
export class CommandValidBuilderService implements ParamDtoValidBuilderAbstractService {
    readonly paramDtoValid: ParamDtoValidService;

    constructor() {
        this.paramDtoValid = container.resolve(ParamDtoValidService);
    }

    buildSupportedSignsValid(paramDto: ParamDtoService): CommandValidBuilderService {
        const { baseValue, index } = paramDto.command;
        if (baseValue === "" && index === -1) return this;
        if (/^[a-zA-Z0-9-]*$/gm.test(baseValue)) return this;
        this.paramDtoValid.supportedSigns = false;
        this.paramDtoValid.supportedSignsWrongIndexes = [index];
        return this;
    }

    buildCorrectPatternValid(paramDto: ParamDtoService): CommandValidBuilderService {
        const { baseValue, index } = paramDto.command;
        if (baseValue === "" && index === -1) return this;
        if (/^[a-zA-Z][a-zA-Z0-9-]*$/gm.test(baseValue)) return this;
        this.paramDtoValid.correctPattern = false;
        this.paramDtoValid.correctPatternWrongIndexes = [index];
        return this;
    }

    buildCanExistValid(_paramDto: ParamDtoService): CommandValidBuilderService {
        return this;
    }

    buildCorrectOrderValid(_paramDto: ParamDtoService): CommandValidBuilderService {
        return this;
    }

    build(): ParamDtoValidService {
        return this.paramDtoValid;
    }
}

// todo: refactor the code
