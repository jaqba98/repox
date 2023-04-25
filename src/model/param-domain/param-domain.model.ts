import { ProgramEnum } from "../../enum/program.enum";
import { CommandEnum } from "../../enum/command.enum";
import { ArgumentEnum } from "../../enum/argument.enum";

/** Programs & Commands arguments */

export interface BaseFieldModel {
  name: ArgumentEnum;
  index: number;
  values: Array<string>;
  hasValue: boolean;
  hasManyValues: boolean;
  isDefined: boolean;
}

export interface EmptyArgsModel {
}

export interface ProgramDefaultArgsModel {
  version: BaseFieldModel;
  clean: BaseFieldModel;
}

export interface CommandDefaultArgsModel {
}

export interface ProgramGenerateCommandWorkspaceArgsModel {
  name: BaseFieldModel;
  config: BaseFieldModel;
}

export interface ProgramGenerateCommandProjectArgsModel {
  name: BaseFieldModel;
  type: BaseFieldModel;
}

/** Parameter config model for correct parameters. */

export type ParamDomainArgsModel =
  EmptyArgsModel |
  ProgramDefaultArgsModel |
  CommandDefaultArgsModel |
  ProgramGenerateCommandWorkspaceArgsModel |
  ProgramGenerateCommandProjectArgsModel;

export interface ParamDomainEntityModel<TName> {
  name: TName;
  index: number;
  args: ParamDomainArgsModel;
}

export interface ParamDomainModel {
  program: ParamDomainEntityModel<ProgramEnum>;
  command: ParamDomainEntityModel<CommandEnum>;
}
