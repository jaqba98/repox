/**
 * The result model of the parameter domain validation.
 */
export interface ParamDomainValidationModel {
  success: boolean;
  wrongIndexes: Array<number>;
  errors: Array<string>;
  tips: Array<string>;
}
