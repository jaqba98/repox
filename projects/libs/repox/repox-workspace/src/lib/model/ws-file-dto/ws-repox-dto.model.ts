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

export interface WsRepoxOptionsTypeScriptDtoModel {
  output: string;
  main: string;
  packageJson: boolean;
  assets: Array<WsRepoxAssetsDtoModel>;
}

export interface WsRepoxBuildDtoModel {
  executor: ProjectSchemeEnum;
  options: WsRepoxOptionsTypeScriptDtoModel;
}

export interface WsRepoxSchemeDtoModel {
  build: WsRepoxBuildDtoModel;
}

export interface WsRepoxProjectDtoModel {
  name: string;
  type: ProjectTypeEnum;
  root: string;
  scheme: WsRepoxSchemeDtoModel;
}

export interface WsRepoxProjectsDtoModel {
  [projectName: string]: WsRepoxProjectDtoModel;
}

export interface WsRepoxDtoModel {
  projects: WsRepoxProjectsDtoModel;
}
