import { ProjectTypeEnum } from "../enum/project-type.enum";

/**
 * The model represents the project inside the monorepo.
 */
export interface ProjectDomainModel {
  name: string;
  type: ProjectTypeEnum;
  path: string;
  assets: Array<string>;
}
