/**
 * This is configuration domain model of repox.
 */

export interface ProjectModel {
  name: string;
  type: 'app' | 'lib' | 'tool';
  path: string;
}

export interface ProjectsModel {
  [project: string]: ProjectModel;
}

export interface RepoxConfigModel {
  version: string;
  projects: {
    apps: ProjectsModel;
    libs: ProjectsModel;
    tools: ProjectsModel;
  }
}
