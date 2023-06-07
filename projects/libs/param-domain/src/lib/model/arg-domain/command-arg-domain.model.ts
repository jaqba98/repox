/**
 * The complete list of domain model for command arguments.
 */

export interface EmptyCommandArgDomainModel {
}

export interface GenerateWorkspaceCommandArgDomainModel {
  workspaceName: string;
}

export interface GenerateProjectCommandArgDomainModel {
  projectName: string;
  projectType: string;
}

export interface BuildProjectCommandArgDomainModel {
  projectName: string;
}

export type CommandArgDomainModel =
  EmptyCommandArgDomainModel |
  GenerateWorkspaceCommandArgDomainModel |
  GenerateProjectCommandArgDomainModel |
  BuildProjectCommandArgDomainModel;
