import { singleton } from "tsyringe";
import {
  ReadParamDto
} from "../../infra/service/reader/read-param-dto";
import {
  ParamDtoValidation
} from "../../infra/service/validation/param-dto-validation";
import {
  ParamDtoValidationModel
} from "../../infra/model/param-dto/param-dto-validation-model";
import {
  ParamDtoModel
} from "../../infra/model/param-dto/param-dto-model";

/**
 * The app service is responsible for read and validate
 * parameter DTO model from command line.
 */
@singleton()
export class ReadParamDtoApp {
  constructor(
    private readonly readParamDto: ReadParamDto,
    private readonly paramDtoValidation: ParamDtoValidation
  ) {
  }

  read(): ParamDtoValidationModel {
    const paramDto: ParamDtoModel = this.readParamDto.readParamDto();
    return this.paramDtoValidation.runValidation(paramDto);
  }
}
