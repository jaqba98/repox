import {singleton} from "tsyringe";

import {ReadArgumentsService} from "../infrastructure/read-arguments.service";
import {BuildParamDtoService} from "../dom-service/builder/build-param-dto.service";
import {ParamDtoValidationService} from "../dom-service/validation/param-dto-validation.service";

@singleton()
/**
 * The app service is responsible for build and validate
 * parameter DTO model from command line.
 */
export class BuildParamDtoAppService {
    constructor(
        private readonly readArguments: ReadArgumentsService,
        private readonly buildParamDto: BuildParamDtoService,
        private readonly paramDtoValidation: ParamDtoValidationService
    ) {
    }

    build(): void {
        const args = this.readArguments.read();
        this.buildParamDto.build(args);
        this.paramDtoValidation.runValidation();
    }
}

// todo: refactor the code