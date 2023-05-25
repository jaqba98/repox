import { ArgumentEnum } from "../../enum/argument.enum";

/**
 * List of models for commands arguments.
 */

export interface GenerateWorkspaceCommandArgsModel {
  [ArgumentEnum.name]: string;
}

export interface GenerateProjectCommandArgsModel {
  [ArgumentEnum.name]: string;
  [ArgumentEnum.type]: string;
}

export interface CommandArgModel
  extends GenerateWorkspaceCommandArgsModel,
    GenerateProjectCommandArgsModel {
}
