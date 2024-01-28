import {container, InjectionToken, singleton} from "tsyringe";

import {ParamDtoErrorAbstractBuilder} from "../builder/param-dto-error/param-dto-error-abstract.builder";
import {ParamDtoError} from "../domain/param-dto-error";

@singleton()
/**
 * The director service contains logic composed of param dto error builder steps.
 */
export class ParamDtoErrorDirector {
    build(
        abstract: InjectionToken<ParamDtoErrorAbstractBuilder>
    ): ParamDtoError {
        return container.resolve(abstract).build();
    }
}
