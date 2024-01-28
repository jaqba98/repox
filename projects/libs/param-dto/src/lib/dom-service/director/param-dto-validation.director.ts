import {container, InjectionToken, singleton} from "tsyringe";

import {ParamDtoValidation} from "../domain/param-dto-validation";
import {ParamDto} from "../domain/param-dto";
import {deepCopy} from "@lib/utils";
import {ParamDtoValidationAbstractBuilder} from "../builder/param-dto-validation/param-dto-validation-abstract.builder";

@singleton()
/**
 * The director service contains logic composed of param dto valid builder steps.
 */
export class ParamDtoValidationDirector {
    build(
        abstract: InjectionToken<ParamDtoValidationAbstractBuilder>,
        paramDto: ParamDto
    ): ParamDtoValidation {
        const cloneParamDto = deepCopy(paramDto);
        return container.resolve(abstract)
            .buildSupportedSignsValid(cloneParamDto)
            .buildCorrectPatternValid(cloneParamDto)
            .buildCanExistValid(cloneParamDto)
            .buildCorrectOrderValid(cloneParamDto)
            .build();
    }
}
// todo: refactor the code