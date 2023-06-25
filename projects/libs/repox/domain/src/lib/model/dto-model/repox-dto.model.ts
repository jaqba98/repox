import { ProjectSchemeEnum } from "../../enum/project-scheme.enum";
import { ProjectTypeEnum } from "../../enum/project-type.enum";

/**
 * The real model of the repox configuration file on the disc.
 */

export interface RepoxStaticPageDtoModel {
  // todo: invent the build structure of static page
}

export interface RepoxTypescriptDtoModel {
  // todo: invent the build structure of typescript
}

export interface RepoxBuildDtoModel extends RepoxStaticPageDtoModel,
  RepoxTypescriptDtoModel {
}

export interface RepoxSchemeDtoModel {
  type: ProjectSchemeEnum;
  build: RepoxBuildDtoModel;
}

export interface RepoxProjectDtoModel {
  name: string;
  type: ProjectTypeEnum;
  path: string;
  scheme: RepoxSchemeDtoModel;
}

export interface RepoxProjectsDtoModel {
  [projectName: string]: RepoxProjectDtoModel;
}

export interface RepoxDtoModel {
  projects: RepoxProjectsDtoModel;
}

// todo: refactor
