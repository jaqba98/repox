import { ArgumentEnum } from "../../enum/argument.enum";
import { ProgramEnum } from "../../enum/program.enum";
import {
  ProgramArgDomainModel
} from "../arg-domain/program-arg-domain.model";
import { CommandEnum } from "../../enum/command.enum";
import {
  CommandArgDomainModel
} from "../arg-domain/command-arg-domain.model";

/**
 * Domain parameter model for all parameters
 * prepared with param DTO model.
 */

export interface ParamDomainBaseEntityModel<TParamName> {
  baseName: string;
  name: TParamName;
  index: number;
}

export interface ParamDomainArgModel
  extends ParamDomainBaseEntityModel<ArgumentEnum> {
  values: Array<string>;
  hasValue: boolean;
  hasManyValues: boolean;
}

export interface ParamDomainEntityModel<TParamName, TParamModel>
  extends ParamDomainBaseEntityModel<TParamName> {
  args: Array<ParamDomainArgModel>;
  model: TParamModel;
}

export interface ParamDomainModel {
  program: ParamDomainEntityModel<ProgramEnum, ProgramArgDomainModel>;
  command: ParamDomainEntityModel<CommandEnum, CommandArgDomainModel>;
}
