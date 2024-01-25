import {container, singleton} from "tsyringe";

import {ParamDtoValidService} from "../../service/param-dto-valid.service";
import {ParamDtoValidBuilderAbstractService} from "./param-dto-valid-builder-abstract.service";
import {ParamDtoService} from "../../service/param-dto.service";

@singleton()
/**
 * The builder contains methods to build validation steps to the program arguments.
 */
export class ProgramArgumentsValidBuilderService implements ParamDtoValidBuilderAbstractService {
    readonly paramDtoValid: ParamDtoValidService;

    constructor() {
        this.paramDtoValid = container.resolve(ParamDtoValidService);
    }

    buildSupportedSignsValid(paramDto: ParamDtoService): ProgramArgumentsValidBuilderService {
        const indexes = paramDto.programArguments
            .filter(argument => argument.baseValue !== "" && argument.index !== -1)
            .filter(argument => !/^[a-zA-Z0-9-="'`,]*$/gm.test(argument.baseValue))
            .map(argument => argument.index);
        if (indexes.length === 0) return this;
        this.paramDtoValid.supportedSigns = false;
        this.paramDtoValid.supportedSignsWrongIndexes = [...indexes];
        return this;
    }

    buildCorrectPatternValid(paramDto: ParamDtoService): ProgramArgumentsValidBuilderService {
        const indexes = paramDto.programArguments
            .filter(argument => argument.baseValue !== "" && argument.index !== -1)
            .filter(argument => !/^[a-zA-Z][a-zA-Z0-9-]*$/gm.test(argument.baseValue))
            .map(argument => argument.index);
        if (indexes.length === 0) return this;
        this.paramDtoValid.correctPattern = false;
        this.paramDtoValid.correctPatternWrongIndexes = [...indexes];
        return this;
    }

    buildCanExistValid(_paramDto: ParamDtoService): ProgramArgumentsValidBuilderService {
        return this;
    }

    buildCorrectOrderValid(_paramDto: ParamDtoService): ProgramArgumentsValidBuilderService {
        return this;
    }

    build(): ParamDtoValidService {
        return this.paramDtoValid;
    }
}

// todo: refactor the code
