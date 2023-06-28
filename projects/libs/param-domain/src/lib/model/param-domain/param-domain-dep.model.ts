/**
 * The model represents dependency between programs, commands,
 * arguments and aliases for given project.
 */

export interface ParamDomainDepArgModel<TArgument> {
  name: TArgument;
  values: Array<string>;
  valueMode: "empty" | "single" | "many";
  required: boolean;
}

export interface ParamDomainDepArgsModel<TArgument> {
  [arg: string]: ParamDomainDepArgModel<TArgument>;
}

export interface ParamDomainDepCommandModel<TCommand, TArgument> {
  command: TCommand;
  args: ParamDomainDepArgsModel<TArgument>;
}

export interface ParamDomainDepCommandsModel<TCommand, TArgument> {
  [command: string]: ParamDomainDepCommandModel<TCommand, TArgument>;
}

export interface ParamDomainDepModel<TProgram, TCommand, TArgument> {
  program: TProgram;
  commands: ParamDomainDepCommandsModel<TCommand, TArgument>;
  args: ParamDomainDepArgsModel<TArgument>;
}
// todo: refactor
