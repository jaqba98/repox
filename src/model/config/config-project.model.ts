/** This is model of project configuration. */

export interface ProjectModel {
  name: string;
  type: 'app' | 'lib' | 'tool';
  path: string;
}

export interface ProjectsModel {
  [project: string]: ProjectModel;
}

export interface ConfigProjectModel {
  version: string;
  projects: {
    apps: ProjectsModel;
    libs: ProjectsModel;
    tools: ProjectsModel;
  }
}
