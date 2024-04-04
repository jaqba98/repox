import { container, type InjectionToken, singleton } from 'tsyringe';

import { type ParamDtoValidation } from '../domain/param-dto-validation';
import {
  type ParamDtoValidationAbstractBuilder
} from '../builder/param-dto-validation/param-dto-validation-abstract.builder';
import { type ParamDto } from '../domain/param-dto';

@singleton()
/**
 * The director uses param dto validation builder to build param dto validation model.
 */
export class ParamDtoValidationDirector {
  build (
    service: InjectionToken<ParamDtoValidationAbstractBuilder>,
    paramDto: ParamDto
  ): ParamDtoValidation {
    return container.resolve(service)
      .buildParamDto(paramDto)
      .buildSupportedSignsValidation()
      .buildCorrectPatternValidation()
      .buildCanExistValidation()
      .buildCorrectOrderValidation()
      .build();
  }
}
