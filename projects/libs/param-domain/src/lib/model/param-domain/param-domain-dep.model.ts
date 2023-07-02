/**
 * The model represents dependency between programs, commands,
 * arguments and aliases for given project.
 */

export interface ParamDomainDepArgModel {
  name: string;
  values: Array<string>;
  valueMode: "empty" | "single" | "many";
  required: boolean;
}

export interface ParamDomainDepArgsModel {
  [arg: string]: ParamDomainDepArgModel;
}

export interface ParamDomainDepCommandModel {
  command: string;
  args: ParamDomainDepArgsModel;
}

export interface ParamDomainDepCommandsModel {
  [command: string]: ParamDomainDepCommandModel;
}

export interface ParamDomainDepModel {
  program: string;
  commands: ParamDomainDepCommandsModel;
  args: ParamDomainDepArgsModel;
}
// todo: refactor