import {container, singleton} from "tsyringe";

import {ParamDtoErrorAbstractBuilder} from "./param-dto-error-abstract.builder";
import {ParamDtoError} from "../../domain/param-dto-error";

@singleton()
/**
 * The builder contains methods to build error steps to the program.
 */
export class ProgramErrorBuilder implements ParamDtoErrorAbstractBuilder {
    readonly paramDtoError: ParamDtoError;

    constructor() {
        this.paramDtoError = container.resolve(ParamDtoError);
    }

    build(): ParamDtoError {
        return this.paramDtoError;
    }
}
