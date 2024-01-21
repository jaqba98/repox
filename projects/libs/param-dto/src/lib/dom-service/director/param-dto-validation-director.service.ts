import {singleton} from "tsyringe";

import {ParamDtoValidationBuilderService} from "../builder/param-dto-validation-builder.service";
import {ParamDtoValidationService} from "../service/param-dto-validation.service";
import {ParamDtoService} from "../service/param-dto.service";

@singleton()
/**
 * The director service contains logic composed of
 * param dto validation builder steps.
 */
export class ParamDtoValidationDirectorService {
    constructor(private readonly paramDtoValidationBuilder: ParamDtoValidationBuilderService) {
    }

    buildProgramValidation(_paramDto: ParamDtoService): ParamDtoValidationService {
        return this.paramDtoValidationBuilder
            .buildSupportedSignsValidator()
            .buildCorrectPatternValidator()
            .buildCanExistValidator()
            .buildCorrectOrderValidator()
            .build();
    }

    buildCommandValidation(_paramDto: ParamDtoService): ParamDtoValidationService {
        return this.paramDtoValidationBuilder
            .buildSupportedSignsValidator()
            .buildCorrectPatternValidator()
            .buildCanExistValidator()
            .buildCorrectOrderValidator()
            .build();
    }

    buildProgramArgumentsValidation(_paramDto: ParamDtoService): ParamDtoValidationService {
        return this.paramDtoValidationBuilder
            .buildSupportedSignsValidator()
            .buildCorrectPatternValidator()
            .buildCanExistValidator()
            .buildCorrectOrderValidator()
            .build();
    }

    buildCommandArgumentsValidation(_paramDto: ParamDtoService): ParamDtoValidationService {
        return this.paramDtoValidationBuilder
            .buildSupportedSignsValidator()
            .buildCorrectPatternValidator()
            .buildCanExistValidator()
            .buildCorrectOrderValidator()
            .build();
    }
}

// todo: refactor the code