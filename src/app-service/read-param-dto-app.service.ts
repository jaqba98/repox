import { singleton } from "tsyringe";
import {
  ParamDtoValidationService
} from "../infra/service/validation/param-dto-validation.service";
import {
  ReadParamDtoService
} from "../infra/service/reader/read-param-dto.service";
import {
  ParamDtoValidationModel
} from "../infra/model/param-dto/param-dto-validation.model";

@singleton()
/**
 * The app service is responsible for:
 * 1) Read params from command line
 *    and save it to parameter DTO model.
 * 2) Run validation on the parameter DTO model.
 */
export class ReadParamDtoAppService {
  constructor(
    private readonly readParamDto: ReadParamDtoService,
    private readonly paramDtoValidation: ParamDtoValidationService
  ) {
  }

  read(): ParamDtoValidationModel {
    const paramDto = this.readParamDto.read();
    return this.paramDtoValidation.runValidation(paramDto);
  }
}
// todo: refactor