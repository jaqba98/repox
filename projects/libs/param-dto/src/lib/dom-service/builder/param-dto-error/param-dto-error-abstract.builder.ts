import {ParamDtoError} from "../../domain/param-dto-error";
import {ParamDtoValidation} from "../../domain/param-dto-validation";

/**
 * The abstract builder contains methods which can be implemented in the param dto error builder service.
 */
export abstract class ParamDtoErrorAbstractBuilder {
    abstract buildSupportedSignsErrors(paramDtoValidation: ParamDtoValidation): ParamDtoErrorAbstractBuilder;

    abstract buildCorrectPatternErrors(paramDtoValidation: ParamDtoValidation): ParamDtoErrorAbstractBuilder;

    abstract buildCanExistErrors(paramDtoValidation: ParamDtoValidation): ParamDtoErrorAbstractBuilder;

    abstract buildCorrectOrderErrors(paramDtoValidation: ParamDtoValidation): ParamDtoErrorAbstractBuilder;

    abstract build(): ParamDtoError;
}
