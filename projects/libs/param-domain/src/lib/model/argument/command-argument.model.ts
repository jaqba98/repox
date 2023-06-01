/**
 * List of models for commands arguments.
 */

export interface EmptyCommandArgModel {
}

export interface GenerateWorkspaceCommandArgModel {
  name: string;
}

export interface GenerateProjectCommandArgModel {
  name: string;
  type: string;
}

export interface BuildProjectCommandArgModel {
  name: string;
}

export type CommandArgumentModel =
  EmptyCommandArgModel |
  GenerateWorkspaceCommandArgModel |
  GenerateProjectCommandArgModel |
  BuildProjectCommandArgModel;
