import {
  type ProjectSchemeEnum,
  type ProjectTypeEnum
} from "@lib/repox-workspace";

/**
 * The repox command model for all commands.
 */

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface EmptyRepoxCommandModel {
}

export interface GenerateWorkspaceRepoxCommandModel {
  workspaceName: string;
}

export interface RegenerateWorkspaceRepoxCommandModel {
  isForceMode: boolean;
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
  isFixMode: boolean;
}

export type TRepoxCommandModel =
  EmptyRepoxCommandModel |
  GenerateWorkspaceRepoxCommandModel |
  RegenerateWorkspaceRepoxCommandModel |
  GenerateProjectRepoxCommandModel |
  BuildProjectRepoxCommandModel |
  PublishNpmRepoxCommandModel |
  LintProjectRepoxCommandModel;
