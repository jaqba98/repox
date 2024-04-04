import { type ParamDto } from '../../domain/param-dto';
import { type ParamDtoValidation } from '../../domain/param-dto-validation';

export abstract class ParamDtoValidationAbstractBuilder {
  abstract paramDtoValidation: ParamDtoValidation;

  abstract paramDto: ParamDto | undefined;

  abstract buildParamDto (paramDto: ParamDto): ParamDtoValidationAbstractBuilder;

  abstract buildSupportedSignsValidation (): ParamDtoValidationAbstractBuilder;

  abstract buildCorrectPatternValidation (): ParamDtoValidationAbstractBuilder;

  abstract buildCanExistValidation (): ParamDtoValidationAbstractBuilder;

  abstract buildCorrectOrderValidation (): ParamDtoValidationAbstractBuilder;

  abstract build (): ParamDtoValidation;
}
