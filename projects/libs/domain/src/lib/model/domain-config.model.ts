import { ProjectDomainModel } from "@lib/project";

/**
 * This is configuration model of domain.
 */

export interface ProjectsModel {
  [project: string]: ProjectDomainModel;
}

export interface DomainConfigModel {
  version: string;
  projects: ProjectsModel;
}
// todo: refactor