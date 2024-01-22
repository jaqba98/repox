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

    buildSupportedSignsValid(_paramDto: ParamDtoService): CommandValidBuilderService {
        return this;
    }

    buildCorrectPatternValid(_paramDto: ParamDtoService): CommandValidBuilderService {
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