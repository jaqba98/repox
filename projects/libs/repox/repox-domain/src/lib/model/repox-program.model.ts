/**
 * The program models for repox program.
 */

export interface EmptyRepoxProgramModel {
}

export interface DefaultDefaultRepoxProgramModel {
  showVersion: boolean;
}

export interface BuildProjectRepoxProgramModel {
  productionMode: boolean;
}

export type TRepoxProgramModel = EmptyRepoxProgramModel |
  DefaultDefaultRepoxProgramModel | BuildProjectRepoxProgramModel;
