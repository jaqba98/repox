import { Argument } from "../../enum/argument";
import { Command } from "../../enum/command";
import { Program } from "../../enum/program";

/**
 * The model represents dependency between programs, commands,
 * arguments and aliases.
 */

export interface ParamDependencyArgModel {
  name: Argument;
  valueMode: "empty" | "single" | "many",
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
