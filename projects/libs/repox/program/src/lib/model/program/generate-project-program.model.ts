import { ProjectSchemeEnum, ProjectTypeEnum } from "@lib/domain";

/**
 * The model contains all properties
 * used by generate project program.
 */
export interface GenerateProjectProgramModel {
  projectName: string;
  projectType: ProjectTypeEnum;
  projectPath: string;
  projectAlias: string;
  projectScheme: ProjectSchemeEnum;
}
