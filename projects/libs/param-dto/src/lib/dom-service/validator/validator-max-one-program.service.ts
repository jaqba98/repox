import {singleton} from "tsyringe";
import {type ValidatorDtoModel} from "../../model/validator-dto.model";
import {BuildParamDtoResultService} from "../builder/build-param-dto-result.service";
import {type ParamDtoValidationModel} from "../../model/param-dto-validation.model";
import {FindParamDtoEntityService} from "../finder/find-param-dto-entity.service";

@singleton()
/**
 * Check the given DTO parameters have max one program.
 */
export class ValidatorMaxOneProgramService
    implements ValidatorDtoModel {
    constructor(
        private readonly buildParamDtoResult: BuildParamDtoResultService,
        private readonly findParamDtoEntity: FindParamDtoEntityService
    ) {
    }

    runValidator(): ParamDtoValidationModel {
        const programs = this.findParamDtoEntity.findPrograms();
        if (programs.length > 1) {
            return this.buildParamDtoResult.buildError(
                programs,
                [`You have specified too many programs!`],
                [
                    `You have to specify max one program.`,
                    `Pattern: repox <program> <arguments> <program> <arguments>`
                ]
            );
        }
        return this.buildParamDtoResult.buildSuccess();
    }
}

// todo: refactor the code
