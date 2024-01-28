import {injectable} from "tsyringe";

import {ParamDtoErrorModel} from "../../model/param-dto-error.model";

@injectable()
/**
 * The service is a recipe how to build param dto error.
 */
export class ParamDtoError {
    supportedSignsErrors: ParamDtoErrorModel | undefined;

    correctPatternErrors: ParamDtoErrorModel | undefined;

    canExistErrors: ParamDtoErrorModel | undefined;

    correctOrderErrors: ParamDtoErrorModel | undefined;
}
