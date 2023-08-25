import {
  type ProjectSchemeEnum,
  type ProjectTypeEnum
} from "@lib/repox-workspace";

/**
 * The workspace domain model.
 */

export interface WsAssetsDomainModel {
  input: string;
  output: string;
}

export interface WsProjectBuildDomainModel {
  output: string;
  main: string;
  assets: WsAssetsDomainModel[];
}

export interface WsProjectDomainModel {
  name: string;
  type: ProjectTypeEnum | undefined;
  path: string;
  src: string;
  scheme: ProjectSchemeEnum | undefined;
  build: WsProjectBuildDomainModel;
  alias: string;
  indexPath: string[];
  changed: boolean;
}

export interface WsDomainModel {
  projects: WsProjectDomainModel[];
}
// todo: refactor the file
