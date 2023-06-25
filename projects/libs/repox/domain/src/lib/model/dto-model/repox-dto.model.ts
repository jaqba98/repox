import { ProjectSchemeEnum } from "../../enum/project-scheme.enum";
import { ProjectTypeEnum } from "../../enum/project-type.enum";

/**
 * The real model of the repox configuration file on the disc.
 */

export interface RepoxBuildStaticPageDtoModel {
  // todo: invent the build structure of static page
}

export interface RepoxBuildTypescriptDtoModel {
  // todo: invent the build structure of typescript
}

export interface RepoxBuildDtoModel
  extends RepoxBuildStaticPageDtoModel,
    RepoxBuildTypescriptDtoModel {
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
