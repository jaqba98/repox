import {ParamDtoError} from "../../domain/param-dto-error";
import {ParamDtoValidationDomain} from "../../domain/param-dto-validation.domain";

/**
 * The abstract builder contains methods which can be implemented in the param dto error builder service.
 */
export abstract class ParamDtoErrorAbstractBuilder {
    abstract buildSupportedSignsErrors(paramDtoValidation: ParamDtoValidationDomain): ParamDtoErrorAbstractBuilder;

    abstract buildCorrectPatternErrors(paramDtoValidation: ParamDtoValidationDomain): ParamDtoErrorAbstractBuilder;

    abstract buildCanExistErrors(paramDtoValidation: ParamDtoValidationDomain): ParamDtoErrorAbstractBuilder;

    abstract buildCorrectOrderErrors(paramDtoValidation: ParamDtoValidationDomain): ParamDtoErrorAbstractBuilder;

    abstract build(): ParamDtoError;
}
// todo: refactor the code