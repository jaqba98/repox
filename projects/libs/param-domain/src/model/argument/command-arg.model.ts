import { ArgumentEnum } from "../../enum/argument.enum";

/**
 * List of models for commands arguments.
 */

export interface EmptyCommandArgsModel {
}

export interface WorkspaceCommandArgsModel {
  [ArgumentEnum.name]: string;
}

export interface ProjectCommandArgsModel {
  [ArgumentEnum.name]: string;
  [ArgumentEnum.type]: string;
}

export type CommandArgModel = EmptyCommandArgsModel |
  WorkspaceCommandArgsModel | ProjectCommandArgsModel;
