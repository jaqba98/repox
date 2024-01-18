import {singleton} from "tsyringe";

import {ParamDtoValidatorModel} from "../../model/param-dto-validator.model";
import {BuildParamDtoResultService} from "../builder/build-param-dto-result.service";
import {ParamDtoValidationModel} from "../../model/param-dto-validation.model";
import {ParamDtoFinderService} from "../finder/param-dto-finder.service";

@singleton()
/** Check the given DTO parameters have max one program. */
export class ValidatorMaxOneProgramService implements ParamDtoValidatorModel {
    constructor(
        private readonly paramDtoFinder: ParamDtoFinderService,
        private readonly buildParamDtoResult: BuildParamDtoResultService
    ) {
    }

    run(): ParamDtoValidationModel {
        const programs = this.paramDtoFinder.findPrograms();
        if (programs.length > 1) {
            return this.buildParamDtoResult.buildError(
                programs,
                ["You have specified too many programs!"],
                [
                    "You have to specify max one program.",
                    "Pattern: repox <program> <arguments> <program> <arguments>"
                ]
            );
        }
        return this.buildParamDtoResult.buildSuccess();
    }
}

// todo: refactor the code