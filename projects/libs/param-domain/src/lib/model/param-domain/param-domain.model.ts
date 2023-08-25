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
  values: string[];
  hasValue: boolean;
  hasManyValues: boolean;
}

export interface ParamDomainEntityModel
  extends ParamDomainBaseEntityModel {
  args: ParamDomainArgModel[];
}

export interface ParamDomainModel {
  program: ParamDomainEntityModel;
  command: ParamDomainEntityModel;
}
// todo: refactor the file
