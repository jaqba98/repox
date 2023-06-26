import { ProjectSchemeEnum } from "@lib/workspace";
import { ProjectTypeEnum } from "../enum/project/project-type.enum";

/**
 * The real model of the domain configuration file on the disc.
 */

export interface DomainAssetsModel {
  input: string;
  output: string;
}

// The build scheme.

export interface DomainOptionsTypescriptModel {
  output: string;
  main: string;
  packageJson: boolean;
  assets: Array<DomainAssetsModel>;
}

export interface DomainBuildOptionsModel
  extends DomainOptionsTypescriptModel {
}

export interface DomainSchemeBuildModel {
  executor: ProjectSchemeEnum;
  options: DomainBuildOptionsModel;
}

// The basic about the domain configuration.

export interface DomainSchemeModel {
  build: DomainSchemeBuildModel;
}

export interface DomainProjectModel {
  name: string;
  type: ProjectTypeEnum;
  root: string;
  scheme: DomainSchemeModel;
}

export interface DomainProjectsModel {
  [projectName: string]: DomainProjectModel;
}

export interface DomainModel {
  projects: DomainProjectsModel;
}
// todo: refactor
