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
  projectScheme: ProjectSchemeEnum;
  projectPath: string;
}

export interface BuildProjectRepoxCommandModel {
  projectName: string;
  buildWatch: boolean;
}

export type TRepoxCommandModel = EmptyRepoxCommandModel |
  GenerateWorkspaceRepoxCommandModel |
  GenerateProjectRepoxCommandModel |
  BuildProjectRepoxCommandModel;
