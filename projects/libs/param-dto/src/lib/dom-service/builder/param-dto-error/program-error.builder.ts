import {container, singleton} from "tsyringe";

import {ParamDtoErrorAbstractBuilder} from "./param-dto-error-abstract.builder";
import {ParamDtoError} from "../../domain/param-dto-error";
import {ParamDtoValidation} from "../../domain/param-dto-validation";

@singleton()
/**
 * The builder contains methods to build error steps to the program.
 */
export class ProgramErrorBuilder implements ParamDtoErrorAbstractBuilder {
    readonly paramDtoError: ParamDtoError;

    constructor() {
        this.paramDtoError = container.resolve(ParamDtoError);
    }

    buildSupportedSignsErrors(_paramDtoValidation: ParamDtoValidation): ParamDtoErrorAbstractBuilder {
        return this;
    }

    buildCorrectPatternErrors(_paramDtoValidation: ParamDtoValidation): ParamDtoErrorAbstractBuilder {
        return this;
    }

    buildCanExistErrors(_paramDtoValidation: ParamDtoValidation): ParamDtoErrorAbstractBuilder {
        return this;
    }

    buildCorrectOrderErrors(_paramDtoValidation: ParamDtoValidation): ParamDtoErrorAbstractBuilder {
        return this;
    }

    build(): ParamDtoError {
        return this.paramDtoError;
    }
}
