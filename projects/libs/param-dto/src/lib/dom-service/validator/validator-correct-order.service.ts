import { singleton } from "tsyringe";
import { type ValidatorDtoModel } from "../../model/validator-dto.model";
import {
  BuildParamDtoResultService
} from "../builder/build-param-dto-result.service";
import {
  FindParamDtoEntityService
} from "../finder/find-param-dto-entity.service";
import { type ParamDtoEntityModel } from "../../model/param-dto.model";
import {
  type ParamDtoValidationModel
} from "../../model/param-dto-validation.model";
import { ParamTypeEnum } from "../../enum/param-type.enum";
import {
  ParamDtoStoreService
} from "../store/param-dto-store.service";

@singleton()
/**
 * Check the given DTO parameters are in correct order.
 */
export class ValidatorCorrectOrderService
implements ValidatorDtoModel {
  constructor (
    private readonly paramDtoStore: ParamDtoStoreService,
    private readonly buildParamDtoResult: BuildParamDtoResultService,
    private readonly findParamDtoEntity: FindParamDtoEntityService
  ) {
  }

  runValidator (): ParamDtoValidationModel {
    const paramDto = this.paramDtoStore.getParamDto();
    const program = this.findParamDtoEntity.findPrograms()[0];
    const wrongParamsDto = paramDto.params.filter(
      param => !this.checkParamOrder(param, program)
    );
    if (wrongParamsDto.length === 0) {
      return this.buildParamDtoResult.buildSuccess();
    }
    return this.buildParamDtoResult.buildError(
      wrongParamsDto,
      [`You have specified the program in the incorrect order!`],
      [
        `You have to specify the program in the correct order.`,
        `Pattern: repox <program> <arguments> <program> <arguments>`
      ]
    );
  }

  private checkParamOrder (
    paramDto: ParamDtoEntityModel,
    program: ParamDtoEntityModel | undefined
  ): boolean {
    const paramOrder = this.getParamOrder().find(
      order => order.paramTypes.includes(paramDto.paramType)
    );
    if (paramOrder == null) {
      throw new Error(`Not supported param type!`);
    }
    if (paramOrder.order === 3 && (program == null)) {
      return paramDto.paramIndex >= 2;
    }
    if (paramOrder.order === 3 && (program != null)) {
      return paramDto.paramIndex >= paramOrder.order;
    }
    return paramDto.paramIndex === paramOrder.order;
  }

  private getParamOrder (): Array<{
    order: number;
    paramTypes: ParamTypeEnum[];
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
