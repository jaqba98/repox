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

export interface ParamDomainEntityModel<TParamModel>
  extends ParamDomainBaseEntityModel {
  args: Array<ParamDomainArgModel>;
  model: TParamModel;
}

export interface ParamDomainModel<TProgramArgModel, TCommandArgModel> {
  program: ParamDomainEntityModel<TProgramArgModel>;
  command: ParamDomainEntityModel<TCommandArgModel>;
}
// todo: refactor
