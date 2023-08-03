import { type ParamDomainDepModel } from "@lib/param-domain";

/**
 * The base get param dependency for each project.
 */
export interface BaseGetParamDepModel {
  getDependency: (program: string) => ParamDomainDepModel
}
