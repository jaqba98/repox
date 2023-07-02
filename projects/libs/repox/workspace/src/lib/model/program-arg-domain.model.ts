/**
 * The complete list of domain model for program arguments.
 */

export interface EmptyProgramArgDomainModel {
}

export interface DefaultDefaultProgramArgDomainModel {
  version: boolean;
}

export type ProgramArgDomainModel =
  EmptyProgramArgDomainModel |
  DefaultDefaultProgramArgDomainModel;
// todo: refactor
