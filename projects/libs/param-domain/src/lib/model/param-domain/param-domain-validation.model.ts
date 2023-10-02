/**
 * The result model of the parameter domain validation.
 */
export interface ParamDomainValidationModel {
    success: boolean;
    wrongIndexes: number[];
    errors: string[];
    tips: string[];
}
