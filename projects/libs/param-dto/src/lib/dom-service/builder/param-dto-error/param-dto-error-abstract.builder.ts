import {ParamDtoError} from "../../domain/param-dto-error";
import {ParamDtoValidationDomain} from "../../domain/param-dto-validation.domain";

/**
 * The abstract builder contains methods which can be implemented
 * in the param dto error builder service.
 */
export abstract class ParamDtoErrorAbstractBuilder {
    abstract paramDtoError: ParamDtoError;

    abstract paramDtoValidation: ParamDtoValidationDomain | undefined;

    abstract buildParamDtoValidation(
        paramDtoValidation: ParamDtoValidationDomain
    ): ParamDtoErrorAbstractBuilder;

    abstract buildSupportedSignsErrors(): ParamDtoErrorAbstractBuilder;

    abstract buildCorrectPatternErrors(): ParamDtoErrorAbstractBuilder;

    abstract buildCanExistErrors(): ParamDtoErrorAbstractBuilder;

    abstract buildCorrectOrderErrors(): ParamDtoErrorAbstractBuilder;

    abstract build(): ParamDtoError;
}
