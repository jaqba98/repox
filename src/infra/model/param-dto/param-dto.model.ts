import { ParamType } from "../../enum/param-type";

/**
 * The DTO model of parameters (data transport model)
 * for all parameters directly from the command line.
 */

export interface ParamDtoEntityModel {
  paramBaseValue: string;
  paramIndex: number;
  paramType: ParamType;
  paramHasValue: boolean;
  paramName: string;
  paramValues: Array<string>;
  paramHasManyValues: boolean;
}

export interface ParamDtoModel {
  params: Array<ParamDtoEntityModel>;
}
