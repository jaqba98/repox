/**
 * Parameters domain model for verified parameters.
 */

export interface ParamDomainArgModel {
  name: string;
  value: Array<string>;
  isAlias: boolean;
}

export interface ParamDomainEntityModel {
  name: string;
  args: Array<ParamDomainArgModel>;
}

export interface ParamDomainModel {
  program: ParamDomainEntityModel;
  command: ParamDomainEntityModel;
}

/**
 * The result model of the parameter domain validation.
 */
export interface ParamsDomainValidatorModel {
  isError: boolean;
  errors: Array<string>;
  tips: Array<string>;
}
