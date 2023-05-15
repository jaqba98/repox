import { singleton } from "tsyringe";
import {
  ValidatorDtoModel
} from "../../model/validator/validator-dto.model";
import {
  BuildParamDtoResultService
} from "../builder/build-param-dto-result.service";
import {
  ParamDtoEntityModel,
  ParamDtoModel
} from "../../model/param-dto/param-dto.model";
import {
  ParamDtoValidationModel
} from "../../model/param-dto/param-dto-validation.model";
import { ParamTypeEnum } from "../../enum/param-type.enum";

@singleton()
/**
 * Check the given DTO parameters are in correct order.
 */
export class CorrectOrderValidatorService implements ValidatorDtoModel {
  constructor(
    private readonly buildParamDtoResult: BuildParamDtoResultService
  ) {
  }

  runValidator(paramDto: ParamDtoModel): ParamDtoValidationModel {
    const program: ParamDtoEntityModel | undefined = paramDto.params
      .find(param => param.paramType === ParamTypeEnum.program);
    const wrongParamsDto: Array<ParamDtoEntityModel> = paramDto.params
      .filter(param => !this.checkParamOrder(param, program));
    if (wrongParamsDto.length === 0) {
      return this.buildParamDtoResult.buildSuccess(paramDto);
    }
    return this.buildParamDtoResult.buildError(
      wrongParamsDto,
      ["You have specified the program in the incorrect order!"],
      [
        "You have to specify the program in the correct order.",
        "Pattern: repox <program> <arguments> <program> <arguments>"
      ],
      paramDto
    );
  }

  private checkParamOrder(
    param: ParamDtoEntityModel,
    program: ParamDtoEntityModel | undefined
  ): boolean {
    const paramOrder = this.getParamOrder()
      .find(order => order.paramTypes.includes(param.paramType));
    if (!paramOrder) {
      throw new Error(`Not supported param type ${param.paramType}!`);
    }
    if (paramOrder.order === 3 && !program) {
      return param.paramIndex >= 2;
    }
    if (paramOrder.order === 3 && program) {
      return param.paramIndex >= paramOrder.order;
    }
    return param.paramIndex === paramOrder.order;
  }

  private getParamOrder(): Array<{
    order: number,
    paramTypes: Array<ParamTypeEnum>
  }> {
    return [
      { order: 0, paramTypes: [ParamTypeEnum.executor] },
      { order: 1, paramTypes: [ParamTypeEnum.application] },
      { order: 2, paramTypes: [ParamTypeEnum.program] },
      {
        order: 3,
        paramTypes: [
          ParamTypeEnum.command,
          ParamTypeEnum.argument,
          ParamTypeEnum.alias
        ]
      }
    ];
  }
}
// todo: refactor