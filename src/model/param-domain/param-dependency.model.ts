import { ArgumentEnum } from "../../enum/argument.enum";
import { CommandEnum } from "../../enum/command.enum";
import { ProgramEnum } from "../../enum/program.enum";

/**
 * The model is used by GetParamDependenceService to give
 * the dependency between programs, commands, arguments and aliases.
 */

export interface ParamDependencyArgModel {
  name: ArgumentEnum;
  mustHasValue: boolean;
  mustHasManyValues: boolean;
  required: boolean;
}

export interface ParamDependencyArgsModel {
  [arg: string]: ParamDependencyArgModel;
}

export interface ParamDependencyCommandModel {
  command: CommandEnum;
  args: ParamDependencyArgsModel;
}

export interface ParamDependencyCommandsModel {
  [command: string]: ParamDependencyCommandModel;
}

export interface ParamDependencyModel {
  program: ProgramEnum;
  commands: ParamDependencyCommandsModel;
  args: ParamDependencyArgsModel;
}
