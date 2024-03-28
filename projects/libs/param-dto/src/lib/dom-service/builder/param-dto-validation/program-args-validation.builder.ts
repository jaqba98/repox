import { container, singleton } from 'tsyringe'

import { ParamDtoValidation } from '../../domain/param-dto-validation'
import { type ParamDto } from '../../domain/param-dto'
import { deepCopy } from '@lib/utils'
import { type ParamDtoValidationAbstractBuilder } from './param-dto-validation-abstract.builder'
import { CheckSupportedSignsService } from '../../service/check-supported-signs.service'
import { EQUAL_SIGN } from '../../../const/param-dto.const'
import { CheckCorrectPatternService } from '../../service/check-correct-pattern.service'

@singleton()
/**
 * The builder contains methods to build validation steps to the program args.
 */
export class ProgramArgsValidationBuilder implements ParamDtoValidationAbstractBuilder {
  paramDtoValidation: ParamDtoValidation

  paramDto: ParamDto | undefined

  constructor (
    private readonly checkSupportedSigns: CheckSupportedSignsService,
    private readonly checkCorrectPattern: CheckCorrectPatternService
  ) {
    this.paramDtoValidation = container.resolve(ParamDtoValidation)
  }

  buildParamDto (paramDto: ParamDto): this {
    this.paramDto = deepCopy(paramDto)
    return this
  }

  buildSupportedSignsValidation (): this {
    const programArgs = this.paramDto?.programArgs
    if (programArgs == null) return this
    const wrongIndexes = programArgs
      .map(programArg => ({
        name: programArg.baseValue.split(EQUAL_SIGN)[0],
        index: programArg.index
      }))
      .filter(programArg => !this.checkSupportedSigns.checkName(programArg.name))
      .map(programArg => programArg.index)
    if (wrongIndexes.length === 0) return this
    this.paramDtoValidation.supportedSigns = false
    this.paramDtoValidation.supportedSignsWrongIndexes = [...wrongIndexes]
    return this
  }

  buildCorrectPatternValidation (): this {
    const programArgs = this.paramDto?.programArgs
    if (programArgs == null) return this
    const wrongIndexes = programArgs
      .map(programArg => ({
        name: programArg.baseValue.split(EQUAL_SIGN)[0],
        index: programArg.index,
        isAlias: programArg.isAlias
      }))
      .filter(programArg => {
        if (programArg.isAlias) {
          return !this.checkCorrectPattern.checkAlias(programArg.name)
        }
        return !this.checkCorrectPattern.checkArgument(programArg.name)
      })
      .map(programArg => programArg.index)
    if (wrongIndexes.length === 0) return this
    this.paramDtoValidation.correctPattern = false
    this.paramDtoValidation.correctPatternWrongIndexes = [...wrongIndexes]
    return this
  }

  buildCanExistValidation (): this {
    return this
  }

  buildCorrectOrderValidation (): this {
    const programArgs = this.paramDto?.programArgs
    if (programArgs == null) return this
    const program = this.paramDto?.program
    const startIndex = (program != null) ? program.index : -1
    const wrongIndexes = programArgs
      .filter(arg => arg.index <= startIndex)
      .map(arg => arg.index)
    if (wrongIndexes.length > 0) {
      this.paramDtoValidation.correctOrder = false
      this.paramDtoValidation.correctOrderWrongIndexes = deepCopy(wrongIndexes)
    }
    return this
  }

  build (): ParamDtoValidation {
    return this.paramDtoValidation
  }
}
