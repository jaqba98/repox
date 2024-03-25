import { container, singleton } from 'tsyringe'

import { type ParamDtoErrorAbstractBuilder } from './param-dto-error-abstract.builder'
import { ParamDtoError } from '../../domain/param-dto-error'
import { type ParamDtoValidation } from '../../domain/param-dto-validation'
import { deepCopy } from '@lib/utils'

@singleton()
/**
 * The builder contains methods to build error steps to the command arguments.
 */
export class CommandArgsErrorBuilder implements ParamDtoErrorAbstractBuilder {
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
    if (this.paramDtoValidation == null) return this
    const { supportedSigns, supportedSignsWrongIndexes } = this.paramDtoValidation
    if (!supportedSigns) {
      this.paramDtoError.supportedSignsErrors = {
        wrongParamIndexes: deepCopy(supportedSignsWrongIndexes),
        errors: [
          'The specified command arguments contain unsupported characters!'
        ],
        tips: [
          'Remember! The command argument value may contain an unsupported character!',
          'Specify a command arguments containing only supported characters and run the command again.',
          'Supported characters for the command arguments are: [a-z], [A-Z], [0-9] and [-].'
        ]
      }
    }
    return this
  }

  buildCorrectPatternErrors (): ParamDtoErrorAbstractBuilder {
    if (this.paramDtoValidation == null) return this
    const { correctPattern, correctPatternWrongIndexes } = this.paramDtoValidation
    if (!correctPattern) {
      this.paramDtoError.correctPatternErrors = {
        wrongParamIndexes: deepCopy(correctPatternWrongIndexes),
        errors: [
          'The specified command arguments have incorrect pattern!'
        ],
        tips: [
          'Specify a command arguments with correct pattern and run the command again.',
          'Example of correct pattern for command arguments are:',
          '1) --arg1, --arg1=test, --arg1="test", --arg1=\'test\', --arg1=`test`',
          '2) -a, -a=test, -a="test", -a=\'test\', -a=`test`'
        ]
      }
    }
    return this
  }

  buildCanExistErrors (): ParamDtoErrorAbstractBuilder {
    if (this.paramDtoValidation == null) return this
    const { canExist, canExistWrongIndexes } = this.paramDtoValidation
    if (!canExist) {
      this.paramDtoError.correctPatternErrors = {
        wrongParamIndexes: deepCopy(canExistWrongIndexes),
        errors: [
          'The specified command arguments can not exist without command!'
        ],
        tips: [
          'Specify a command for given command arguments and run the command again.'
        ]
      }
    }
    return this
  }

  buildCorrectOrderErrors (): ParamDtoErrorAbstractBuilder {
    if (this.paramDtoValidation == null) return this
    const { correctOrder, correctOrderWrongIndexes } = this.paramDtoValidation
    if (!correctOrder) {
      this.paramDtoError.correctPatternErrors = {
        wrongParamIndexes: deepCopy(correctOrderWrongIndexes),
        errors: [
          'The specified command arguments have not correct order!'
        ],
        tips: [
          'Specify the command args after the command and run the command again.'
        ]
      }
    }
    return this
  }

  build (): ParamDtoError {
    return this.paramDtoError
  }
}
