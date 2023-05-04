import { singleton } from "tsyringe";
import {
  ReadParamDtoService
} from "../../infra/service/reader/read-param-dto.service";
import {
  ParamDtoValidationService
} from "../../infra/service/validation/param-dto-validation.service";
import {
  ParamDtoValidationModel
} from "../../infra/model/param-dto/param-dto-validation-model";
import {
  ParamDtoModel
} from "../../infra/model/param-dto/param-dto-model";

@singleton()
/**
 * The app service is responsible for read and validate
 * parameter DTO model from command line.
 */
export class ReadParamDtoAppService {
  constructor(
    private readonly readParamDto: ReadParamDtoService,
    private readonly paramDtoValidation: ParamDtoValidationService
  ) {
  }

  read(): ParamDtoValidationModel {
    const paramDto: ParamDtoModel = this.readParamDto.read();
    return this.paramDtoValidation.runValidation(paramDto);
  }
}
