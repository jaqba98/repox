import {
  ProjectSchemeEnum,
  ProjectTypeEnum
} from "@lib/repox-workspace";

/**
 * The dto model of real repox.json file on disc.
 */

export interface WsRepoxAssetsDtoModel {
  input: string;
  output: string;
}

export interface WsRepoxBuildAppTsDtoModel {
  output: string;
  main: string;
  assets: Array<WsRepoxAssetsDtoModel>;
}

export interface WsRepoxProjectBuildDtoModel
  extends WsRepoxBuildAppTsDtoModel {
}

export interface WsRepoxProjectDtoModel {
  name: string;
  type: ProjectTypeEnum;
  path: string;
  scheme: ProjectSchemeEnum;
  build: WsRepoxProjectBuildDtoModel;
}

export interface WsRepoxProjectsDtoModel {
  [projectName: string]: WsRepoxProjectDtoModel;
}

export interface WsRepoxDtoModel {
  projects: WsRepoxProjectsDtoModel;
}
