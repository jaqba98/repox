import { Argument } from "../../enum/argument";
import { Program } from "../../enum/program";
import { Command } from "../../enum/command";

/**
 * Domain parameter model for all parameters built from dto.
 */

export interface ParamDomainArgumentModel {
  name: Argument;
  values: Array<string>;
  index: number;
  hasValue: boolean;
  hasManyValues: boolean;
}

export interface ParamDomainEntityModel<TName> {
  name: TName;
  index: number;
  args: Array<ParamDomainArgumentModel>;
}

export interface ParamDomainModel {
  program: ParamDomainEntityModel<Program>;
  command: ParamDomainEntityModel<Command>;
}
