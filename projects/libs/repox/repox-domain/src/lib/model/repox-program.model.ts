/**
 * The repox program model for all programs.
 */

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface EmptyRepoxProgramModel {
}

export interface DefaultDefaultRepoxProgramModel {
  showVersion: boolean;
}

export type TRepoxProgramModel =
  EmptyRepoxProgramModel |
  DefaultDefaultRepoxProgramModel;

// todo: refactor the code
