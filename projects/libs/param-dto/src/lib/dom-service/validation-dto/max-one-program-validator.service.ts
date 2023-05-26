import { singleton } from "tsyringe";
import { ValidatorDtoModel } from "../../model/validator-dto.model";
import {
  BuildParamDtoResultService
} from "../builder/build-param-dto-result.service";
import {
  ParamDtoValidationModel
} from "../../model/param-dto-validation.model";
import {
  ParamDtoFinderService
} from "../finder/param-dto-finder.service";
import { ParamDtoModel } from "../../model/param-dto.model";

@singleton()
/**
 * Check the given DTO parameters have max one program.
 */
export class MaxOneProgramValidatorService
  implements ValidatorDtoModel {
  constructor(
    private readonly buildParamDtoResult: BuildParamDtoResultService,
    private readonly paramDtoFinder: ParamDtoFinderService
  ) {
  }

  runValidator(paramDto: ParamDtoModel): ParamDtoValidationModel {
    const programs = this.paramDtoFinder.findProgram(paramDto);
    if (programs.length > 1) {
      return this.buildParamDtoResult.buildError(
        programs,
        ["You have specified too many programs!"],
        [
          "You have to specify max one program.",
          "Pattern: repox <program> <arguments> <program> <arguments>"
        ],
        paramDto
      );
    }
    return this.buildParamDtoResult.buildSuccess(paramDto);
  }
}
