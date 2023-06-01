import { ParamDtoModel } from "./param-dto.model";

/**
 * The result model of the parameter DTO validation.
 */
export interface ParamDtoValidationModel {
  success: boolean;
  wrongParamIndexes: Array<number>;
  baseValues: Array<string>;
  errors: Array<string>;
  tips: Array<string>;
  model: ParamDtoModel;
}
// todo: refactor