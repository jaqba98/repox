import { ProjectDomainModel } from "@lib/project";

/**
 * This is configuration model of repox file.
 */

export interface ProjectsModel {
  [project: string]: ProjectDomainModel;
}

export interface RepoxDomainModel {
  projects: ProjectsModel;
}
// todo: refactor
