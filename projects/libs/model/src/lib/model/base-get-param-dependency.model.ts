import { ParamDomainDepModel } from "@lib/param-domain";

/**
 * The base get param dependency for each project.
 */
export interface BaseGetParamDependencyModel {
  getDependency(program: string): ParamDomainDepModel;
}
