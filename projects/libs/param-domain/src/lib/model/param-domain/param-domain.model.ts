/**
 * Domain parameter model for all parameters
 * prepared with param DTO model.
 */

export interface ParamDomainBaseEntityModel<TParamName> {
  baseName: string;
  name: TParamName;
  index: number;
}

export interface ParamDomainArgModel<TParamArgument>
  extends ParamDomainBaseEntityModel<TParamArgument> {
  values: Array<string>;
  hasValue: boolean;
  hasManyValues: boolean;
}

export interface ParamDomainEntityModel<
  TParamName, TParamArgument, TParamModel
> extends ParamDomainBaseEntityModel<TParamName> {
  args: Array<ParamDomainArgModel<TParamArgument>>;
  model: TParamModel;
}

export interface ParamDomainModel<
  TProgram, TCommand, TArgument, TProgramModel, TCommandModel
> {
  program: ParamDomainEntityModel<TProgram, TArgument, TProgramModel>;
  command: ParamDomainEntityModel<TCommand, TArgument, TCommandModel>;
}
