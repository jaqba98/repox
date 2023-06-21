/**
 * The complete list of domain model for command arguments.
 */

export interface EmptyCommandArgDomainModel {
}

export interface GenerateWorkspaceCommandArgDomainModel {
  workspaceName: string;
}

export interface GenerateProjectCommandArgDomainModel {
  name: string;
  type: string;
  path: string;
  scheme: string;
}

export interface BuildProjectCommandArgDomainModel {
  projectName: string;
}

export interface BuildLinkProjectCommandArgDomainModel {
  projectName: string;
}

export interface BuildUnlinkProjectCommandArgDomainModel {
  projectName: string;
}

export type CommandArgDomainModel =
  EmptyCommandArgDomainModel |
  GenerateWorkspaceCommandArgDomainModel |
  GenerateProjectCommandArgDomainModel |
  BuildProjectCommandArgDomainModel |
  BuildLinkProjectCommandArgDomainModel |
  BuildUnlinkProjectCommandArgDomainModel;
// todo: refactor
