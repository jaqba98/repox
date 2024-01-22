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

    buildSupportedSignsValid(_paramDto: ParamDtoService): ProgramValidBuilderService {
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