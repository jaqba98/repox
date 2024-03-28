/**
 * Domain parameter model for all parameters
 * prepared with param dto model.
 */

export interface ParamDomainArgModel {
  values: string[]
  hasValue: boolean
  hasManyValues: boolean
}

export type ParamDomainArgsModel = Record<string, ParamDomainArgModel>
