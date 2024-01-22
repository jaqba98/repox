import {container, singleton} from "tsyringe";

import {ParamDtoValidService} from "../../service/param-dto-valid.service";
import {ParamDtoValidBuilderAbstractService} from "./param-dto-valid-builder-abstract.service";

@singleton()
/**
 * The builder contains methods to build validation steps to the program arguments.
 */
export class ProgramArgumentsValidBuilderService implements ParamDtoValidBuilderAbstractService {
    readonly paramDtoValid: ParamDtoValidService;

    constructor() {
        this.paramDtoValid = container.resolve(ParamDtoValidService);
    }

    buildSupportedSignsValid(): ProgramArgumentsValidBuilderService {
        return this;
    }

    buildCorrectPatternValid(): ProgramArgumentsValidBuilderService {
        return this;
    }

    buildCanExistValid(): ProgramArgumentsValidBuilderService {
        return this;
    }

    buildCorrectOrderValid(): ProgramArgumentsValidBuilderService {
        return this;
    }

    build(): ParamDtoValidService {
        return this.paramDtoValid;
    }
}

// todo: refactor the code