import { ArgumentEnum } from "../../enum/argument.enum";

/**
 * List of models for commands arguments.
 */

export interface EmptyCommandArgModel {
}

export interface GenerateWorkspaceCommandArgModel {
  [ArgumentEnum.name]: string;
}

export interface GenerateProjectCommandArgModel {
  [ArgumentEnum.name]: string;
  [ArgumentEnum.type]: string;
}

export type CommandArgumentModel =
  EmptyCommandArgModel |
  GenerateWorkspaceCommandArgModel |
  GenerateProjectCommandArgModel;
