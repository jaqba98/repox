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

    buildSupportedSignsErrors(paramDtoValidation: ParamDtoValidation): ParamDtoErrorAbstractBuilder {
        if (paramDtoValidation.supportedSigns) return this;
        this.paramDtoError.supportedSignsErrors = {
            wrongParamIndexes: [...paramDtoValidation.supportedSignsWrongIndexes],
            errors: ["Error :("],
            tips: ["Tip :)"]
        };
        return this;
    }

    buildCorrectPatternErrors(paramDtoValidation: ParamDtoValidation): ParamDtoErrorAbstractBuilder {
        if (paramDtoValidation.correctPattern) return this;
        this.paramDtoError.correctPatternErrors = {
            wrongParamIndexes: [...paramDtoValidation.correctPatternWrongIndexes],
            errors: ["Error :("],
            tips: ["Tip :)"]
        };
        return this;
    }

    buildCanExistErrors(paramDtoValidation: ParamDtoValidation): ParamDtoErrorAbstractBuilder {
        if (paramDtoValidation.canExist) return this;
        this.paramDtoError.canExistErrors = {
            wrongParamIndexes: [...paramDtoValidation.canExistWrongIndexes],
            errors: ["Error :("],
            tips: ["Tip :)"]
        };
        return this;
    }

    buildCorrectOrderErrors(paramDtoValidation: ParamDtoValidation): ParamDtoErrorAbstractBuilder {
        if (paramDtoValidation.correctOrder) return this;
        this.paramDtoError.correctOrderErrors = {
            wrongParamIndexes: [...paramDtoValidation.correctOrderWrongIndexes],
            errors: ["Error :("],
            tips: ["Tip :)"]
        };
        return this;
    }

    build(): ParamDtoError {
        return this.paramDtoError;
    }
}
// todo: refactor the code