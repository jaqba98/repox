import { singleton } from "tsyringe";
import {
  ValidatorDtoModel
} from "../../model/validator-dto/validator-dto-model";
import {
  BuildParamDtoValidationService
} from "../builder/validation/build-param-dto-validation.service";
import {
  ParamDtoEntityModel,
  ParamDtoModel
} from "../../model/param-dto/param-dto-model";
import {
  ParamDtoValidationModel
} from "../../model/param-dto/param-dto-validation-model";
import { ParamType } from "../../enum/param-type";

@singleton()
/**
 * The validator is responsible for checking that
 * the given DTO parameters are in correct order.
 */
export class CorrectOrderValidatorService
  implements ValidatorDtoModel {
  constructor(
    private readonly buildParam: BuildParamDtoValidationService
  ) {
  }

  runValidator(paramDto: ParamDtoModel): ParamDtoValidationModel {
    const program: ParamDtoEntityModel | undefined = paramDto.params
      .find(param => param.paramType === ParamType.program);
    const wrongParamsDto: Array<ParamDtoEntityModel> = paramDto.params
      .filter(param => !this.checkParamOrder(param, program));
    if (wrongParamsDto.length === 0) {
      return this.buildParam.paramDtoValidationSuccess(paramDto);
    }
    return this.buildParam.paramDtoValidationError(
      wrongParamsDto,
      ["You have specified the command in the incorrect order!"],
      [
        "You have to specify the command in the correct order.",
        "Pattern: repox <program> <arguments> <command> <arguments>"
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
      throw new Error("Not supported param type!");
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
    paramTypes: Array<ParamType>
  }> {
    return [
      { order: 0, paramTypes: [ParamType.executor] },
      { order: 1, paramTypes: [ParamType.application] },
      { order: 2, paramTypes: [ParamType.program] },
      {
        order: 3,
        paramTypes: [
          ParamType.command,
          ParamType.argument,
          ParamType.alias
        ]
      }
    ];
  }
}
