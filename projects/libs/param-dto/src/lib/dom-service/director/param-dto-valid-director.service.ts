import {container, InjectionToken, singleton} from "tsyringe";

import {ParamDtoValidService} from "../service/param-dto-valid.service";
import {ParamDtoValidBuilderAbstractService} from "../builder/param-dto-valid/param-dto-valid-builder-abstract.service";
import {ParamDtoService} from "../service/param-dto.service";
import {deepCopy} from "@lib/utils";

@singleton()
/**
 * The director service contains logic composed of param dto valid builder steps.
 */
export class ParamDtoValidDirectorService {
    build(
        abstract: InjectionToken<ParamDtoValidBuilderAbstractService>,
        paramDto: ParamDtoService
    ): ParamDtoValidService {
        const cloneParamDto = deepCopy(paramDto);
        return container.resolve(abstract)
            .buildSupportedSignsValid(cloneParamDto)
            .buildCorrectPatternValid(cloneParamDto)
            .buildCanExistValid(cloneParamDto)
            .buildCorrectOrderValid(cloneParamDto)
            .build();
    }
}
