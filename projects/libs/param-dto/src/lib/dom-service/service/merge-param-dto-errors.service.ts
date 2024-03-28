import { singleton } from 'tsyringe'

import { type ParamDtoErrorModel } from '../../model/param-dto-error.model'
import { type ParamDtoError } from '../domain/param-dto-error'

@singleton()
/**
 * The service is responsible for merging all param dto errors
 * into one array.
 */
export class MergeParamDtoErrorsService {
  merge (errors: ParamDtoError[]): ParamDtoErrorModel[] {
    const allErrors = [
      ...errors.map(error => error.supportedSignsErrors),
      ...errors.map(error => error.correctPatternErrors),
      ...errors.map(error => error.canExistErrors),
      ...errors.map(error => error.correctOrderErrors)
    ]
    return allErrors.filter(error => error.wrongParamIndexes.length > 0)
  }
}
