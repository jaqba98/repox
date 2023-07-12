import {
  ProjectSchemeEnum,
  ProjectTypeEnum
} from "@lib/repox-workspace";

/**
 * The complete list of domain models for repox commands.
 */

export interface EmptyRepoxCommandDomainModel {
}

export interface GenerateWorkspaceRepoxCommandDomainModel {
  workspaceName: string;
}

export interface GenerateProjectRepoxCommandDomainModel {
  projectName: string;
  projectType: ProjectTypeEnum;
  projectPath: string;
  projectScheme: ProjectSchemeEnum;
}

export interface BuildProjectRepoxCommandDomainModel {
  projectName: string;
}

export type RepoxCommandDomainModel =
  EmptyRepoxCommandDomainModel |
  GenerateWorkspaceRepoxCommandDomainModel |
  GenerateProjectRepoxCommandDomainModel |
  BuildProjectRepoxCommandDomainModel;
// todo: refactor
