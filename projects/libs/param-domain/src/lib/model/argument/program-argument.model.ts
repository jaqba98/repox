import { ArgumentEnum } from "../../enum/argument.enum";

/**
 * List of models for programs arguments.
 */

export interface EmptyProgramArgModel {
}

export interface DefaultProgramArgModel {
  [ArgumentEnum.version]: boolean;
}

export type ProgramArgumentModel =
  EmptyProgramArgModel |
  DefaultProgramArgModel;
