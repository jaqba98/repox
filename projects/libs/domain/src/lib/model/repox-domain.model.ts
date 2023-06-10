import { ProjectDomainModel } from "@lib/project";

/**
 * This is configuration model of repox file.
 */

export interface ProjectsModel {
  [project: string]: ProjectDomainModel;
}

export interface RepoxDomainModel {
  version: string;
  projects: ProjectsModel;
}
