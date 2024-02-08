import {injectable} from "tsyringe";

import {ParamDtoErrorModel} from "../../model/param-dto-error.model";

@injectable()
/**
 * The domain class is a recipe how to build param dto error object.
 */
export class ParamDtoError {
    supportedSignsErrors: ParamDtoErrorModel;

    correctPatternErrors: ParamDtoErrorModel;

    canExistErrors: ParamDtoErrorModel;

    correctOrderErrors: ParamDtoErrorModel;

    constructor() {
        this.supportedSignsErrors = {wrongParamIndexes: [], errors: [], tips: []};
        this.correctPatternErrors = {wrongParamIndexes: [], errors: [], tips: []};
        this.canExistErrors = {wrongParamIndexes: [], errors: [], tips: []};
        this.correctOrderErrors = {wrongParamIndexes: [], errors: [], tips: []};
    }
}
