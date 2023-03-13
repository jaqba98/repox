import { ProgramEnum } from "../../enum/program.enum";
import { CommandEnum } from "../../enum/command.enum";
import { ArgumentEnum } from "../../enum/argument.enum";

/**
 * Parameters domain model for correct parameters.
 */

export interface ParamDomainArgModel {
  name: ArgumentEnum;
  value: Array<string>;
  index: number;
  isAlias: boolean;
}

export interface ParamDomainEntityModel<TName> {
  name: TName;
  index: number;
  args: Array<ParamDomainArgModel>;
}

export interface ParamDomainModel {
  program: ParamDomainEntityModel<ProgramEnum>;
  command: ParamDomainEntityModel<CommandEnum>;
}
