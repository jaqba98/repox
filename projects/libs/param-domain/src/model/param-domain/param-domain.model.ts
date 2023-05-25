import { ArgumentEnum } from "../../enum/argument.enum";
import { ProgramEnum } from "../../enum/program.enum";
import { CommandEnum } from "../../enum/command.enum";
import { CommandArgModel } from "../argument/command-arg.model";
import { ProgramArgModel } from "../argument/program-arg.model";

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
}

export interface ParamDomainEntityModel<TName, TArgs>
  extends ParamDomainBaseEntityModel<TName> {
  args: Array<ParamDomainArgModel>;
  model: TArgs;
}

export interface ParamDomainModel {
  program: ParamDomainEntityModel<ProgramEnum, ProgramArgModel>;
  command: ParamDomainEntityModel<CommandEnum, CommandArgModel>;
}
