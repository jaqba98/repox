import {type ProjectTypeEnum} from "@lib/repox-workspace";

/**
 * The workspace domain model.
 */

export interface WsProjectDomainModel {
    name: string;
    type: ProjectTypeEnum;
    path: string;
    src: string;
    assets: Array<{ input: string; output: string; }>;
    alias: string;
    indexPath: string[];
    changed: boolean;
}

export interface WsDomainModel {
    projects: WsProjectDomainModel[];
}

// todo: refactor the code
