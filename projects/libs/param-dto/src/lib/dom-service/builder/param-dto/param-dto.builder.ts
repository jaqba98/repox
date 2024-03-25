import { container, singleton } from 'tsyringe'

import { type ParamDtoAbstractBuilder } from './param-dto-abstract.builder'
import { ParamDto } from '../../domain/param-dto'
import { deepCopy, getIndexesBetween } from '@lib/utils'
import {
  ALIAS_PREFIX,
  ARGUMENT_PREFIX,
  EQUAL_SIGN,
  VALUE_SEPARATOR
} from '../../../const/param-dto.const'
import { type ArgumentParamDtoModel } from '../../../model/param-dto.model'

@singleton()
/**
 * The builder contains methods to build every single param dto element.
 */
export class ParamDtoBuilder implements ParamDtoAbstractBuilder {
  readonly paramDto: ParamDto

  constructor () {
    this.paramDto = container.resolve(ParamDto)
  }

  buildBaseArgs (args: string[]): ParamDtoAbstractBuilder {
    this.paramDto.baseArgs = deepCopy(args)
    return this
  }

  buildProgram (): ParamDtoAbstractBuilder {
    if (this.paramDto.baseArgs === undefined) return this
    const program = this.paramDto.baseArgs.at(0)
    if (program === undefined) return this
    if (program.startsWith(ARGUMENT_PREFIX)) return this
    if (program.startsWith(ALIAS_PREFIX)) return this
    this.paramDto.program = { baseValue: program, index: 0 }
    return this
  }

  buildCommand (): ParamDtoAbstractBuilder {
    const { baseArgs, program } = this.paramDto
    if (baseArgs === undefined) return this
    const endIndex = program ? program.index : 0
    const command = baseArgs
      .map((baseValue: string, index: number) => ({ baseValue, index }))
      .find(baseParamDto => {
        if (baseParamDto.index <= endIndex) return false
        if (baseParamDto.baseValue.startsWith(ARGUMENT_PREFIX)) return false
        return !baseParamDto.baseValue.startsWith(ALIAS_PREFIX)
      })
    if (command === undefined) return this
    this.paramDto.command = deepCopy(command)
    return this
  }

  buildProgramArgs (): ParamDtoAbstractBuilder {
    const { baseArgs } = this.paramDto
    if (baseArgs === undefined) return this
    const startIndex = this.paramDto.program?.index ?? -1
    const endIndex = this.paramDto.command?.index ?? baseArgs.length
    const args: ArgumentParamDtoModel[] = getIndexesBetween(startIndex, endIndex)
      .map(index => this.buildArgumentParamDto(index, baseArgs))
    if (args.length === 0) return this
    this.paramDto.programArgs = deepCopy(args)
    return this
  }

  buildCommandArgs (): ParamDtoAbstractBuilder {
    const { baseArgs, command } = this.paramDto
    if (baseArgs === undefined) return this
    if (command === undefined) return this
    const startIndex = this.paramDto.command?.index ?? -1
    const endIndex = baseArgs.length
    const args: ArgumentParamDtoModel[] = getIndexesBetween(startIndex, endIndex)
      .map(index => this.buildArgumentParamDto(index, baseArgs))
    if (args.length === 0) return this
    this.paramDto.commandArgs = deepCopy(args)
    return this
  }

  build (): ParamDto {
    return this.paramDto
  }

  private buildArgumentParamDto (index: number, args: string[]): ArgumentParamDtoModel {
    const baseValue = args[index] ?? ''
    const hasValue = baseValue.includes(EQUAL_SIGN)
    const name = this.buildArgumentName(baseValue, hasValue)
    const values = this.buildArgumentValues(baseValue, hasValue)
    const hasManyValues = values.length > 1
    const isAlias = this.buildIsAlias(baseValue, name)
    return { baseValue, index, hasValue, name, values, hasManyValues, isAlias }
  }

  private buildArgumentName (baseValue: string, hasValue: boolean): string {
    const name = hasValue ? baseValue.split(EQUAL_SIGN)[0] : baseValue
    if (name.startsWith(ARGUMENT_PREFIX)) return name.replace(ARGUMENT_PREFIX, '')
    if (name.startsWith(ALIAS_PREFIX)) return name.replace(ALIAS_PREFIX, '')
    return baseValue
  }

  private buildArgumentValues (baseValue: string, hasValue: boolean): string[] {
    if (!hasValue) return []
    return baseValue
      .split(EQUAL_SIGN)[1]
      .replace(/\s/g, '')
      .replace(/^["'`]/, '')
      .replace(/["'`]$/, '')
      .split(VALUE_SEPARATOR)
  }

  private buildIsAlias (baseValue: string, name: string): boolean {
    return baseValue[0] === ALIAS_PREFIX &&
            baseValue[1] !== ALIAS_PREFIX &&
            name.length === 1
  }
}
