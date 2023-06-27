import { singleton } from "tsyringe";
import {
  ParamDtoEntityModel,
  ParamDtoModel
} from "../../model/param-dto.model";
import {
  ParamDtoValidationModel
} from "../../model/param-dto-validation.model";
import {
  ParamDtoStoreService
} from "../store/param-dto-store.service";

@singleton()
/**
 * Build the result of the param DTO validation
 * for success and error.
 */
export class BuildParamDtoResultService {
  constructor(private readonly paramDtoStore: ParamDtoStoreService) {
  }

  buildSuccess(): ParamDtoValidationModel {
    const paramDto = this.paramDtoStore.getParamDto();
    return {
      success: true,
      wrongIndexes: [],
      baseValues: this.getBaseValues(paramDto),
      errors: [],
      tips: []
    };
  }

  buildError(
    wrongParamsDto: Array<ParamDtoEntityModel>,
    errors: Array<string>,
    tips: Array<string>
  ): ParamDtoValidationModel {
    const paramDto = this.paramDtoStore.getParamDto();
    return {
      success: false,
      wrongIndexes: wrongParamsDto.map(item => item.paramIndex),
      baseValues: this.getBaseValues(paramDto),
      errors,
      tips
    };
  }

  private getBaseValues(paramDto: ParamDtoModel): Array<string> {
    return paramDto.params.map(param => param.paramBaseValue);
  }
}
