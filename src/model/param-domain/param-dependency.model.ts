import { Argument } from "../../enum/argument";
import { Command } from "../../enum/command";
import { Program } from "../../enum/program";

/**
 * The model is used by GetParamDependenceService to give
 * the dependency between programs, commands, arguments and aliases.
 */

export interface ParamDependencyArgModel {
  name: Argument;
  mustHasValue: boolean;
  mustHasManyValues: boolean;
  required: boolean;
}

export interface ParamDependencyArgsModel {
  [arg: string]: ParamDependencyArgModel;
}

export interface ParamDependencyCommandModel {
  command: Command;
  args: ParamDependencyArgsModel;
}

export interface ParamDependencyCommandsModel {
  [command: string]: ParamDependencyCommandModel;
}

export interface ParamDependencyModel {
  program: Program;
  commands: ParamDependencyCommandsModel;
  args: ParamDependencyArgsModel;
}
