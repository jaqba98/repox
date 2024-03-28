import { container, type InjectionToken, singleton } from 'tsyringe'

import { type ParamDtoError } from '../domain/param-dto-error'
import {
  type ParamDtoErrorAbstractBuilder
} from '../builder/param-dto-error/param-dto-error-abstract.builder'
import { type ParamDtoValidation } from '../domain/param-dto-validation'
import { deepCopy } from '@lib/utils'

@singleton()
/**
 * The director service contains logic composed of param dto error builder steps.
 */
export class ParamDtoErrorDirector {
  build (
    abstract: InjectionToken<ParamDtoErrorAbstractBuilder>,
    paramDtoValidation: ParamDtoValidation
  ): ParamDtoError {
    const cloneParamDtoValidation = deepCopy(paramDtoValidation)
    return container.resolve(abstract)
      .buildParamDtoValidation(cloneParamDtoValidation)
      .buildSupportedSignsErrors()
      .buildCorrectPatternErrors()
      .buildCanExistErrors()
      .buildCorrectOrderErrors()
      .build()
  }
}
