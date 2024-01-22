import {container, singleton} from "tsyringe";

import {ParamDtoValidService} from "../../service/param-dto-valid.service";
import {ParamDtoValidBuilderAbstractService} from "./param-dto-valid-builder-abstract.service";

@singleton()
/**
 * The builder contains methods to build validation steps to the command.
 */
export class CommandValidBuilderService implements ParamDtoValidBuilderAbstractService {
    readonly paramDtoValid: ParamDtoValidService;

    constructor() {
        this.paramDtoValid = container.resolve(ParamDtoValidService);
    }

    buildSupportedSignsValid(): CommandValidBuilderService {
        return this;
    }

    buildCorrectPatternValid(): CommandValidBuilderService {
        return this;
    }

    buildCanExistValid(): CommandValidBuilderService {
        return this;
    }

    buildCorrectOrderValid(): CommandValidBuilderService {
        return this;
    }

    build(): ParamDtoValidService {
        return this.paramDtoValid;
    }
}

// todo: refactor the code