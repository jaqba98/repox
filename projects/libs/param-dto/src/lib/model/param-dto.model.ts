import { ParamTypeEnum } from "../enum/param-type.enum";

/**
 * The DTO model of parameters (data transport model)
 * for all parameters directly from the command line.
 */

export interface ParamDtoEntityModel {
  paramBaseValue: string;
  paramIndex: number;
  paramType: ParamTypeEnum;
  paramHasValue: boolean;
  paramName: string;
  paramValues: Array<string>;
  paramHasManyValues: boolean;
}

export interface ParamDtoModel {
  params: Array<ParamDtoEntityModel>;
}
// todo: refactor