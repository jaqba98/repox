import { ArgumentEnum } from "../../enum/argument.enum";
import { ProgramEnum } from "../../enum/program.enum";
import { CommandEnum } from "../../enum/command.enum";

/** Parameters domain model for correct parameters. */

export interface ParamDomainArgModel {
  name: ArgumentEnum;
  values: Array<string>;
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
// todo: fix it