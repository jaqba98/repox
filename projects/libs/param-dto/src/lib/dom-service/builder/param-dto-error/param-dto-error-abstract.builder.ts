import {ParamDtoError} from "../../domain/param-dto-error";

/**
 * The abstract builder contains methods which can be implemented in the param dto error builder service.
 */
export abstract class ParamDtoErrorAbstractBuilder {
    abstract build(): ParamDtoError;
}
