import {type ProjectTypeEnum} from "@lib/repox-workspace";

/**
 * The dto model of real repox.json file on disc.
 */

export interface WsRepoxProjectDtoModel {
    name?: string;
    type?: ProjectTypeEnum;
    path?: string;
    src?: string;
    assets?: Array<{ input: string; output: string; }>;
}

export type WsRepoxProjectsDtoModel = Record<string, WsRepoxProjectDtoModel>;

export interface WsRepoxDtoModel {
    projects?: WsRepoxProjectsDtoModel;
}
