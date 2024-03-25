import { container, singleton } from 'tsyringe'

import { type ParamDtoErrorAbstractBuilder } from './param-dto-error-abstract.builder'
import { ParamDtoError } from '../../domain/param-dto-error'
import { type ParamDtoValidation } from '../../domain/param-dto-validation'
import { deepCopy } from '@lib/utils'

@singleton()
/**
 * The builder contains methods to build error steps to the command.
 */
export class CommandErrorBuilder implements ParamDtoErrorAbstractBuilder {
  paramDtoValidation: ParamDtoValidation | undefined

  readonly paramDtoError: ParamDtoError

  constructor () {
    this.paramDtoError = container.resolve(ParamDtoError)
  }

  buildParamDtoValidation (
    paramDtoValidation: ParamDtoValidation
  ): ParamDtoErrorAbstractBuilder {
    this.paramDtoValidation = deepCopy(paramDtoValidation)
    return this
  }

  buildSupportedSignsErrors (): ParamDtoErrorAbstractBuilder {
    if (!this.paramDtoValidation) return this
    const { supportedSigns, supportedSignsWrongIndexes } = this.paramDtoValidation
    if (!supportedSigns) {
      this.paramDtoError.supportedSignsErrors = {
        wrongParamIndexes: deepCopy(supportedSignsWrongIndexes),
        errors: [
          'The specified command contains unsupported characters!'
        ],
        tips: [
          'Specify a command containing only supported characters and run the command again.',
          'Supported characters for the command are: [a-z], [A-Z], [0-9] and [-].'
        ]
      }
    }
    return this
  }

  buildCorrectPatternErrors (): ParamDtoErrorAbstractBuilder {
    if (!this.paramDtoValidation) return this
    const { correctPattern, correctPatternWrongIndexes } = this.paramDtoValidation
    if (!correctPattern) {
      this.paramDtoError.correctPatternErrors = {
        wrongParamIndexes: deepCopy(correctPatternWrongIndexes),
        errors: [
          'The specified command has incorrect pattern!'
        ],
        tips: [
          'Specify a command with correct pattern and run the command again.',
          'Example of correct pattern for command is: test-command'
        ]
      }
    }
    return this
  }

  buildCanExistErrors (): ParamDtoErrorAbstractBuilder {
    if (!this.paramDtoValidation) return this
    const { canExist, canExistWrongIndexes } = this.paramDtoValidation
    if (!canExist) {
      this.paramDtoError.correctPatternErrors = {
        wrongParamIndexes: deepCopy(canExistWrongIndexes),
        errors: [
          'The specified command can not exist without program!'
        ],
        tips: [
          'Specify a program for given command and run the command again.'
        ]
      }
    }
    return this
  }

  buildCorrectOrderErrors (): ParamDtoErrorAbstractBuilder {
    if (!this.paramDtoValidation) return this
    const { correctOrder, correctOrderWrongIndexes } = this.paramDtoValidation
    if (!correctOrder) {
      this.paramDtoError.correctPatternErrors = {
        wrongParamIndexes: deepCopy(correctOrderWrongIndexes),
        errors: [
          'The specified command has not correct order!'
        ],
        tips: [
          'Specify the command after the program and run the command again.'
        ]
      }
    }
    return this
  }

  build (): ParamDtoError {
    return this.paramDtoError
  }
}
