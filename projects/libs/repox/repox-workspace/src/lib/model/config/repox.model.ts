import {
  ProjectSchemeEnum,
  ProjectTypeEnum
} from "@lib/repox-workspace";

/**
 * The real model of the repox configuration file on the disc.
 */

export interface RepoxAssetsModel {
  input: string;
  output: string;
}

export interface RepoxOptionsTypescriptModel {
  output: string;
  main: string;
  packageJson: boolean;
  assets: Array<RepoxAssetsModel>;
}

export interface RepoxBuildOptionsModel
  extends RepoxOptionsTypescriptModel {
}

export interface RepoxSchemeBuildModel {
  executor: ProjectSchemeEnum;
  options: RepoxBuildOptionsModel;
}

export interface RepoxSchemeModel {
  build: RepoxSchemeBuildModel;
}

export interface RepoxProjectModel {
  name: string;
  type: ProjectTypeEnum;
  root: string;
  scheme: RepoxSchemeModel;
}

export interface RepoxProjectsModel {
  [projectName: string]: RepoxProjectModel;
}

export interface RepoxModel {
  projects: RepoxProjectsModel;
}
