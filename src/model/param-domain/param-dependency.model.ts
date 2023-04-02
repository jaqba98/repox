import { ArgumentEnum } from "../../enum/argument.enum";
import { CommandEnum } from "../../enum/command.enum";
import { ProgramEnum } from "../../enum/program.enum";

/**
 * The model is used by GetParamDependenceService to give
 * the dependency between programs, commands, arguments and aliases.
 */

export interface ParamDependencyArgModel {
  argName: ArgumentEnum;
  required: boolean;
}

export interface ParamDependencyArgsModel {
  [arg: string]: ParamDependencyArgModel;
}

export interface ParamDependencyCommandModel {
  commandName: CommandEnum;
  args: ParamDependencyArgsModel;
}

export interface ParamDependencyCommandsModel {
  [command: string]: ParamDependencyCommandModel;
}

export interface ParamDependencyModel {
  programName: ProgramEnum;
  commands: ParamDependencyCommandsModel;
  args: ParamDependencyArgsModel;
}
