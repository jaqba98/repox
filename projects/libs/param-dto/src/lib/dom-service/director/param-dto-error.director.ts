import {container, InjectionToken, singleton} from "tsyringe";

import {ParamDtoError} from "../domain/param-dto-error";
import {
    ParamDtoErrorAbstractBuilder
} from "../builder/param-dto-error/param-dto-error-abstract.builder";
import {ParamDtoValidationDomain} from "../domain/param-dto-validation.domain";
import {deepCopy} from "@lib/utils";

@singleton()
/**
 * The director service contains logic composed of param dto error builder steps.
 */
export class ParamDtoErrorDirector {
    build(
        abstract: InjectionToken<ParamDtoErrorAbstractBuilder>,
        paramDtoValidation: ParamDtoValidationDomain
    ): ParamDtoError {
        const cloneParamDtoValidation = deepCopy(paramDtoValidation);
        return container.resolve(abstract)
            .buildParamDtoValidation(cloneParamDtoValidation)
            .buildSupportedSignsErrors()
            .buildCorrectPatternErrors()
            .buildCanExistErrors()
            .buildCorrectOrderErrors()
            .build();
    }
}
