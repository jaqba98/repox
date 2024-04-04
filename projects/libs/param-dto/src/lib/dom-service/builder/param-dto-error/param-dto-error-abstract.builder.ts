import { type ParamDtoError } from '../../domain/param-dto-error';
import { type ParamDtoValidation } from '../../domain/param-dto-validation';

/**
 * The abstract builder contains methods which can be implemented
 * in the param dto error builder service.
 */
export abstract class ParamDtoErrorAbstractBuilder {
  abstract paramDtoError: ParamDtoError;

  abstract paramDtoValidation: ParamDtoValidation | undefined;

  abstract buildParamDtoValidation (
    paramDtoValidation: ParamDtoValidation
  ): ParamDtoErrorAbstractBuilder;

  abstract buildSupportedSignsErrors (): ParamDtoErrorAbstractBuilder;

  abstract buildCorrectPatternErrors (): ParamDtoErrorAbstractBuilder;

  abstract buildCanExistErrors (): ParamDtoErrorAbstractBuilder;

  abstract buildCorrectOrderErrors (): ParamDtoErrorAbstractBuilder;

  abstract build (): ParamDtoError;
}
