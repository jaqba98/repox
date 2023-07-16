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

export interface WsProjectDomainModel {
  name: string;
  type: ProjectTypeEnum;
  path: string;
  scheme: ProjectSchemeEnum;
  build: {
    output: string;
    main: string;
    assets: Array<WsAssetsDomainModel>;
  };
  alias: string;
  indexPath: Array<string>;
}

export interface WsDomainModel {
  projects: Array<WsProjectDomainModel>;
}
