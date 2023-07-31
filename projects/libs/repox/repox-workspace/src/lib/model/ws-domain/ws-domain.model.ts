import {
  ProjectSchemeEnum,
  ProjectTypeEnum
} from "@lib/repox-workspace";

/**
 * The workspace domain model.
 */

export interface WsPagesDomainModel {
  input: string;
  output: string;
}

export interface WsAssetsDomainModel {
  input: string;
  output: string;
}

export interface WsProjectBuildDomainModel {
  output: string;
  main: string;
  pages: Array<WsPagesDomainModel>;
  assets: Array<WsAssetsDomainModel>;
}

export interface WsProjectDomainModel {
  name: string;
  type: ProjectTypeEnum | undefined;
  path: string;
  scheme: ProjectSchemeEnum | undefined;
  build: WsProjectBuildDomainModel;
  alias: string;
  indexPath: Array<string>;
  changed: boolean;
}

export interface WsDomainModel {
  projects: Array<WsProjectDomainModel>;
}
