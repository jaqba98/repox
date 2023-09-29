/**
 * The result model of the parameter DTO validation.
 */
export interface ParamDtoValidationModel {
    success: boolean;
    wrongIndexes: number[];
    baseValues: string[];
    errors: string[];
    tips: string[];
}
