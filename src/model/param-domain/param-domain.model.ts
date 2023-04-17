import { ProgramEnum } from "../../enum/program.enum";
import { CommandEnum } from "../../enum/command.enum";
import { ArgumentEnum } from "../../enum/argument.enum";

/** Programs & Commands arguments */

export interface BaseFieldModel {
  name: ArgumentEnum;
  index: number;
  value: Array<string>;
  hasValue: boolean;
  hasManyValues: boolean;
}

export interface UnknownArgsModel {
}

export interface ProgramDefaultArgsModel {
  version: BaseFieldModel;
}

export interface CommandDefaultArgsModel {
}

export interface CommandGenerateWorkspaceArgsModel {
  name: BaseFieldModel;
}

export interface CommandGenerateProjectArgsModel {
  name: BaseFieldModel;
  type: BaseFieldModel;
}

/** Parameter domain model for correct parameters. */

export type ParamDomainArgsModel =
  UnknownArgsModel |
  ProgramDefaultArgsModel |
  CommandDefaultArgsModel |
  CommandGenerateWorkspaceArgsModel |
  CommandGenerateProjectArgsModel;

export interface ParamDomainEntityModel<TName> {
  name: TName;
  index: number;
  args: ParamDomainArgsModel;
}

export interface ParamDomainModel {
  program: ParamDomainEntityModel<ProgramEnum>;
  command: ParamDomainEntityModel<CommandEnum>;
}
