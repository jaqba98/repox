import {type ParamDtoValidationModel} from "./param-dto-validation.model";

/**
 * The model which is implemented for each parameter DTO validator.
 * It defines the implementation of it.
 */
export interface ValidatorDtoModel {
    runValidator: () => ParamDtoValidationModel;
}
