/**
 * The complete list of models for repox program arguments.
 */

export interface EmptyProgramArgRepoxModel {
}

export interface DefaultDefaultProgramArgRepoxModel {
  version: boolean;
}

export type ProgramArgRepoxModel =
  EmptyProgramArgRepoxModel |
  DefaultDefaultProgramArgRepoxModel;
// todo: refactor