/**
 * The result model of the parameter DTO validation.
 */
export interface ParamDtoValidationModel {
  success: boolean;
  wrongIndexes: Array<number>;
  baseValues: Array<string>;
  errors: Array<string>;
  tips: Array<string>;
}
