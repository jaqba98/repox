import {
  type ProjectSchemeEnum,
  type ProjectTypeEnum
} from "@lib/repox-workspace";

/**
 * The command models for repox program.
 */

// eslint-disable-next-line @typescript-eslint/no-empty-interface
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

export interface PublishNpmRepoxCommandModel {
  projectName: string;
}

export interface LintProjectRepoxCommandModel {
  fix: boolean;
}

export type TRepoxCommandModel = EmptyRepoxCommandModel |
GenerateWorkspaceRepoxCommandModel |
GenerateProjectRepoxCommandModel |
BuildProjectRepoxCommandModel |
PublishNpmRepoxCommandModel |
LintProjectRepoxCommandModel;
// todo: refactor the file
