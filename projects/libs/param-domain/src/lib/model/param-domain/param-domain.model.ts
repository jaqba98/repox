import { ArgumentEnum } from "../../enum/argument.enum";
import { ProgramEnum } from "../../enum/program.enum";
import {
  ProgramArgumentModel
} from "../argument/program-argument.model";
import { CommandEnum } from "../../enum/command.enum";
import {
  CommandArgumentModel
} from "../argument/command-argument.model";

/**
 * Domain parameter model for all parameters built from dto.
 */

export interface ParamDomainBaseEntityModel<TName> {
  baseName: string;
  name: TName;
  index: number;
}

export interface ParamDomainArgModel
  extends ParamDomainBaseEntityModel<ArgumentEnum> {
  values: Array<string>;
  hasValue: boolean;
  hasManyValues: boolean;
}

export interface ParamDomainEntityModel<TName, TArgs>
  extends ParamDomainBaseEntityModel<TName> {
  args: Array<ParamDomainArgModel>;
  model: TArgs;
}

export interface ParamDomainModel {
  program: ParamDomainEntityModel<ProgramEnum, ProgramArgumentModel>;
  command: ParamDomainEntityModel<CommandEnum, CommandArgumentModel>;
}
// todo: refactor