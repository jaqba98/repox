/**
 * The complete list of models for repox command arguments.
 */

export interface EmptyCommandArgRepoxModel {
}

export interface GenerateWorkspaceCommandArgRepoxModel {
  workspaceName: string;
}

export interface GenerateProjectCommandArgRepoxModel {
  name: string;
  type: string;
  path: string;
  scheme: string;
}

export interface BuildProjectCommandArgRepoxModel {
  projectName: string;
}

export type CommandArgRepoxModel =
  EmptyCommandArgRepoxModel |
  GenerateWorkspaceCommandArgRepoxModel |
  GenerateProjectCommandArgRepoxModel |
  BuildProjectCommandArgRepoxModel;
// todo: refactor