import { ProjectTypeEnum } from "../enum/project-type.enum";

/**
 * The model represents the project inside the monorepo.
 */

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
}
