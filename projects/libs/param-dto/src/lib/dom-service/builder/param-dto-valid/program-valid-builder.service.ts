import {container, singleton} from "tsyringe";

import {ParamDtoValidService} from "../../service/param-dto-valid.service";
import {ParamDtoValidBuilderAbstractService} from "./param-dto-valid-builder-abstract.service";

@singleton()
/**
 * The builder contains methods to build validation steps to the program.
 */
export class ProgramValidBuilderService implements ParamDtoValidBuilderAbstractService {
    readonly paramDtoValid: ParamDtoValidService;

    constructor() {
        this.paramDtoValid = container.resolve(ParamDtoValidService);
    }

    buildSupportedSignsValid(): ProgramValidBuilderService {
        return this;
    }

    buildCorrectPatternValid(): ProgramValidBuilderService {
        return this;
    }

    buildCanExistValid(): ProgramValidBuilderService {
        return this;
    }

    buildCorrectOrderValid(): ProgramValidBuilderService {
        return this;
    }

    build(): ParamDtoValidService {
        return this.paramDtoValid;
    }
}

// todo: refactor the code