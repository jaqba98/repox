import {
  ProgramAliasEnum,
  ProgramEnum
} from "../../enum/program.enum";
import {
  CommandAliasEnum,
  CommandEnum
} from "../../enum/command.enum";
import { AliasEnum, ArgumentEnum } from "../../enum/argument.enum";

/**
 * Parameters domain model for correct parameters.
 */

export interface ParamDomainArgModel {
  name: ArgumentEnum | AliasEnum;
  value: Array<string>;
  index: number;
  isAlias: boolean;
}

export interface ParamDomainEntityModel<TName, TAlias> {
  name: TName | TAlias;
  index: number;
  args: Array<ParamDomainArgModel>;
}

export interface ParamDomainModel {
  program: ParamDomainEntityModel<ProgramEnum, ProgramAliasEnum>;
  command: ParamDomainEntityModel<CommandEnum, CommandAliasEnum>;
}
