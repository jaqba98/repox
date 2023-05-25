import { ArgumentEnum } from "../../enum/argument.enum";

/**
 * List of models for programs arguments.
 */

export interface EmptyProgramArgsModel {
}

export interface DefaultProgramArgsModel {
  [ArgumentEnum.version]: boolean;
}

export type ProgramArgModel = EmptyProgramArgsModel |
  DefaultProgramArgsModel;
