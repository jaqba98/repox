import {ParamDtoValidation} from "../../domain/param-dto-validation";
import {ParamDtoDomain} from "../../domain/param-dto.domain";

/**
 * The abstract builder contains methods which can be implemented in the param dto validation builder service.
 */
export abstract class ParamDtoValidationAbstractBuilder {
    abstract readonly paramDtoValid: ParamDtoValidation;

    abstract buildSupportedSignsValid(paramDto: ParamDtoDomain): ParamDtoValidationAbstractBuilder;

    abstract buildCorrectPatternValid(paramDto: ParamDtoDomain): ParamDtoValidationAbstractBuilder;

    abstract buildCanExistValid(paramDto: ParamDtoDomain): ParamDtoValidationAbstractBuilder;

    abstract buildCorrectOrderValid(paramDto: ParamDtoDomain): ParamDtoValidationAbstractBuilder;

    abstract build(): ParamDtoValidation;
}
// todo: refactor the code