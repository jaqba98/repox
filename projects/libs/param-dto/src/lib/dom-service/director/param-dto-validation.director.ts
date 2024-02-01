import {container, InjectionToken, singleton} from "tsyringe";

import {ParamDtoValidationDomain} from "../domain/param-dto-validation.domain";
import {
    ParamDtoValidationAbstractBuilder
} from "../builder/param-dto-validation/param-dto-validation-abstract.builder";
import {ParamDtoDomain} from "../domain/param-dto.domain";

@singleton()
/**
 * The director uses param dto validation builder to build param dto validation model.
 */
export class ParamDtoValidationDirector {
    build(
        service: InjectionToken<ParamDtoValidationAbstractBuilder>,
        paramDto: ParamDtoDomain
    ): ParamDtoValidationDomain {
        return container.resolve(service)
            .buildParamDto(paramDto)
            .buildSupportedSignsValidation()
            .buildCorrectPatternValidation()
            .buildCanExistValidation()
            .buildCorrectOrderValidation()
            .build();
    }
}
