import {
  type ProjectSchemeEnum,
  type ProjectTypeEnum
} from "@lib/repox-workspace";

/**
 * The dto model of real repox.json file on disc.
 */

export interface WsRepoxAssetsDtoModel {
  input: string;
  output: string;
}

export interface WsRepoxBuildAppTsDtoModel {
  output?: string;
  main?: string;
  assets?: WsRepoxAssetsDtoModel[];
}

export interface WsRepoxProjectBuildDtoModel
  extends WsRepoxBuildAppTsDtoModel {
}

export interface WsRepoxProjectDtoModel {
  name?: string;
  type?: ProjectTypeEnum;
  path?: string;
  src?: string;
  scheme?: ProjectSchemeEnum;
  build?: WsRepoxProjectBuildDtoModel;
}

export type WsRepoxProjectsDtoModel = Record<string, WsRepoxProjectDtoModel>;

export interface WsRepoxDtoModel {
  projects?: WsRepoxProjectsDtoModel;
}
