import {ParamDtoDomain} from "../../domain/param-dto.domain";
import {ParamDtoValidationDomain} from "../../domain/param-dto-validation.domain";

export abstract class ParamDtoValidationAbstractBuilder {
    abstract paramDtoValidation: ParamDtoValidationDomain;

    abstract paramDto: ParamDtoDomain | undefined;

    abstract buildParamDto(paramDto: ParamDtoDomain): ParamDtoValidationAbstractBuilder;

    abstract buildSupportedSignsValidation(): ParamDtoValidationAbstractBuilder;

    abstract buildCorrectPatternValidation(): ParamDtoValidationAbstractBuilder;

    abstract buildCanExistValidation(): ParamDtoValidationAbstractBuilder;

    abstract buildCorrectOrderValidation(): ParamDtoValidationAbstractBuilder;

    abstract build(): ParamDtoValidationDomain;
}
