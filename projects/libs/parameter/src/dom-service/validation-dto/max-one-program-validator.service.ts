import {
  ParamDtoEntityModel,
  ParamDtoModel
} from "../../model/param-dto/param-dto.model";
import { singleton } from "tsyringe";
import {
  ValidatorDtoModel
} from "../../model/validator/validator-dto.model";
import {
  BuildParamDtoResultService
} from "../builder/build-param-dto-result.service";
import {
  ParamDtoValidationModel
} from "../../model/param-dto/param-dto-validation.model";
import { ParamTypeEnum } from "../../enum/param-type.enum";

@singleton()
/**
 * Check the given DTO parameters have max one program.
 */
export class MaxOneProgramValidatorService implements ValidatorDtoModel {
  constructor(
    private readonly buildParamDtoResult: BuildParamDtoResultService
  ) {
  }

  runValidator(paramDto: ParamDtoModel): ParamDtoValidationModel {
    const programs: Array<ParamDtoEntityModel> = paramDto.params
      .filter(param => param.paramType === ParamTypeEnum.program);
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
