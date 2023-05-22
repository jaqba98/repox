import { singleton } from "tsyringe";
import { ValidatorDtoModel } from "../../model/validator-dto.model";
import {
  BuildParamDtoResultService
} from "../builder/build-param-dto-result.service";
import { ParamDtoModel } from "../../model/param-dto.model";
import {
  ParamDtoValidationModel
} from "../../model/param-dto-validation.model";
import {
  ParamDtoFinderService
} from "../finder/param-dto-finder.service";

@singleton()
/**
 * Check the given DTO parameters have max one program
 * (0 or 1 if the program exist and 0 if the program not exist).
 */
export class MaxOneCommandValidatorService
  implements ValidatorDtoModel {
  constructor(
    private readonly buildParamDtoResult: BuildParamDtoResultService,
    private readonly paramDtoFinder: ParamDtoFinderService
  ) {
  }

  runValidator(paramDto: ParamDtoModel): ParamDtoValidationModel {
    const program = this.paramDtoFinder.findProgram(paramDto)[0];
    const commands = this.paramDtoFinder.findCommand(paramDto);
    if (!program && commands.length > 0) {
      return this.buildParamDtoResult.buildError(
        commands,
        ["You have specified the command without any program!"],
        [
          "You have to specify a program.",
          "Pattern: repox <program> <arguments> <program> <arguments>"
        ],
        paramDto
      );
    }
    if (program && commands.length > 1) {
      return this.buildParamDtoResult.buildError(
        commands,
        ["You have specified too many commands!"],
        [
          "You have to specify one command for the given program.",
          "Pattern: repox <program> <arguments> <program> <arguments>"
        ],
        paramDto
      );
    }
    return this.buildParamDtoResult.buildSuccess(paramDto);
  }
}
