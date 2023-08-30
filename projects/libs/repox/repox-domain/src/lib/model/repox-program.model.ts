/**
 * The repox program model for all programs.
 */

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface EmptyRepoxProgramModel {
}

export interface DefaultDefaultRepoxProgramModel {
  showVersion: boolean;
}

export interface BuildProjectRepoxProgramModel {
  productionMode: boolean;
}

export type TRepoxProgramModel =
  EmptyRepoxProgramModel |
  DefaultDefaultRepoxProgramModel |
  BuildProjectRepoxProgramModel;
