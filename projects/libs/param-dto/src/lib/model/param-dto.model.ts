/**
 * The param dto model of parameters (data transport model)
 * for all parameters provided by the user.
 */

export interface ArgumentParamDtoModel extends BaseParamDtoModel {
  hasValue: boolean
  name: string
  values: string[]
  hasManyValues: boolean
  isAlias: boolean
}

export interface BaseParamDtoModel {
  baseValue: string
  index: number
}
