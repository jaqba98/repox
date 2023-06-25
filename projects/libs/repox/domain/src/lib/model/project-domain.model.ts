import { ProjectTypeEnum } from "../enum/project-type.enum";
import { ProjectSchemeEnum } from "../enum/project-scheme.enum";

/**
 * The model represents the project inside the monorepo.
 */

export interface ProjectSchemeModel {
  type: ProjectSchemeEnum;
}

export interface ProjectAssetsModel {
  inputDir: string;
  fileName: string;
  outputDir: string;
}

export interface ProjectDomainModel {
  name: string;
  type: ProjectTypeEnum;
  path: string;
  assets: Array<ProjectAssetsModel>;
  scheme: ProjectSchemeModel;
}
// todo: refactor
