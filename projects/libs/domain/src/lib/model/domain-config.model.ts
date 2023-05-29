/**
 * This is configuration model of domain.
 */

export interface ProjectModel {
  name: string;
  type: 'app' | 'lib' | 'tool';
  path: string;
}

export interface ProjectsModel {
  [project: string]: ProjectModel;
}

export interface DomainConfigModel {
  version: string;
  projects: ProjectsModel;
}
