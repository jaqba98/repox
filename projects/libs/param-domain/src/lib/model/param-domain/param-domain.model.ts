/**
 * Domain parameter model for all parameters
 * prepared with param DTO model.
 */

export interface ParamDomainBaseEntityModel {
  baseName: string;
  name: string;
  index: number;
}

export interface ParamDomainArgModel
  extends ParamDomainBaseEntityModel {
  values: Array<string>;
  hasValue: boolean;
  hasManyValues: boolean;
}

export interface ParamDomainEntityModel
  extends ParamDomainBaseEntityModel {
  args: Array<ParamDomainArgModel>;
}

export interface ParamDomainModel {
  program: ParamDomainEntityModel;
  command: ParamDomainEntityModel;
}
// todo: refactor