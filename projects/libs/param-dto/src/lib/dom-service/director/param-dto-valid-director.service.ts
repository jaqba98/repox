import {container, InjectionToken, singleton} from "tsyringe";

import {ParamDtoValidService} from "../service/param-dto-valid.service";
import {ParamDtoValidBuilderAbstractService} from "../builder/param-dto-valid/param-dto-valid-builder-abstract.service";

@singleton()
/**
 * The director service contains logic composed of param dto valid builder steps.
 */
export class ParamDtoValidDirectorService {
    build(abstract: InjectionToken<ParamDtoValidBuilderAbstractService>): ParamDtoValidService {
        return container.resolve(abstract)
            .buildSupportedSignsValid()
            .buildCorrectPatternValid()
            .buildCanExistValid()
            .buildCorrectOrderValid()
            .build();
    }
}
