import {
  ProjectSchemeEnum,
  ProjectTypeEnum
} from "@lib/repox-workspace";

/**
 * The command models for repox program.
 */

export interface EmptyRepoxCommandModel {
}

export interface GenerateWorkspaceRepoxCommandModel {
  workspaceName: string;
}

export interface GenerateProjectRepoxCommandModel {
  projectName: string;
  projectType: ProjectTypeEnum;
  projectPath: string;
  projectScheme: ProjectSchemeEnum;
}

export interface BuildProjectRepoxCommandModel {
  projectName: string;
}

export type TRepoxCommandModel = EmptyRepoxCommandModel |
  GenerateWorkspaceRepoxCommandModel |
  GenerateProjectRepoxCommandModel |
  BuildProjectRepoxCommandModel;
