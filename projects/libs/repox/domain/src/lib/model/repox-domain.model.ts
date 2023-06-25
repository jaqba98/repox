/**
 * This is configuration model of repox file.
 */
import { ProjectDomainModel } from "./project-domain.model";


export interface ProjectsModel {
  [project: string]: ProjectDomainModel;
}

export interface RepoxDomainModel {
  projects: ProjectsModel;
}
// todo: refactor
