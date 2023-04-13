/**
 * This is main core of domain model.
 */

export interface DomainProjectModel {
  name: string;
  type: 'app' | 'lib' | 'tool';
  path: string;
}

export interface DomainProjectsModel {
  [project: string]: DomainProjectModel;
}

export interface DomainModel {
  version: string;
  projects: DomainProjectsModel;
}
// todo: fix it