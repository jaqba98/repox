import {
  ProjectSchemeEnum,
  ProjectTypeEnum
} from "@lib/repox-workspace";

/**
 * The workspace domain model.
 */

export interface WsAssetsDomainModel {
  input: string;
  output: string;
}

export interface WsProjectBuildDomainModel {
  output?: string;
  main?: string;
  assets?: Array<WsAssetsDomainModel>;
}

export interface WsProjectDomainModel {
  name: string;
  type: ProjectTypeEnum;
  path: string;
  scheme: ProjectSchemeEnum;
  build: WsProjectBuildDomainModel;
  alias: string;
  indexPath: Array<string>;
  changed: boolean;
}

export interface WsDomainModel {
  projects: Array<WsProjectDomainModel>;
}
