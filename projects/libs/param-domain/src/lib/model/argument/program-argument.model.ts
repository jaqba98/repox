/**
 * List of models for programs arguments.
 */

export interface EmptyProgramArgModel {
}

export interface DefaultProgramArgModel {
  version: boolean;
}

export type ProgramArgumentModel =
  EmptyProgramArgModel |
  DefaultProgramArgModel;
