/**
 * The complete list of domain models for repox program.
 */

export interface EmptyRepoxProgramDomainModel {
}

export interface DefaultDefaultRepoxProgramDomainModel {
  showVersion: boolean;
}

export type RepoxProgramDomainModel =
  EmptyRepoxProgramDomainModel |
  DefaultDefaultRepoxProgramDomainModel;
// todo: refactor
