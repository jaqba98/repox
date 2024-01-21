import {container, singleton} from "tsyringe";

import {ParamDtoValidationService} from "../service/param-dto-validation.service";

@singleton()
/**
 * The builder contains methods to build every single param dto validation element.
 */
export class ParamDtoValidationBuilderService {
    private readonly paramDtoValidation: ParamDtoValidationService;

    constructor() {
        this.paramDtoValidation = container.resolve(ParamDtoValidationService);
    }

    build(): ParamDtoValidationService {
        return this.paramDtoValidation;
    }
}

// todo: refactor the code