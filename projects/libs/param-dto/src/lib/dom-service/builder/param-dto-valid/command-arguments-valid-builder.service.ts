import {container, singleton} from "tsyringe";

import {ParamDtoValidService} from "../../service/param-dto-valid.service";
import {ParamDtoValidBuilderAbstractService} from "./param-dto-valid-builder-abstract.service";
import {ParamDtoService} from "../../service/param-dto.service";

@singleton()
/**
 * The builder contains methods to build validation steps to the command arguments.
 */
export class CommandArgumentsValidBuilderService implements ParamDtoValidBuilderAbstractService {
    readonly paramDtoValid: ParamDtoValidService;

    constructor() {
        this.paramDtoValid = container.resolve(ParamDtoValidService);
    }

    buildSupportedSignsValid(_paramDto: ParamDtoService): CommandArgumentsValidBuilderService {
        return this;
    }

    buildCorrectPatternValid(_paramDto: ParamDtoService): CommandArgumentsValidBuilderService {
        return this;
    }

    buildCanExistValid(_paramDto: ParamDtoService): CommandArgumentsValidBuilderService {
        return this;
    }

    buildCorrectOrderValid(_paramDto: ParamDtoService): CommandArgumentsValidBuilderService {
        return this;
    }

    build(): ParamDtoValidService {
        return this.paramDtoValid;
    }
}

// todo: refactor the code