import { singleton } from "tsyringe";
import {
  ReadParamDtoService
} from "../infrastructure/service/reader/read-param-dto.service";
import {
  ParamDtoValidationService
} from "../infrastructure/service/validation/param-dto-validation.service";
import {
  ParamDtoValidationModel
} from "../infrastructure/model/param-dto/param-dto-validation.model";

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
    const paramDto = this.readParamDto.read();
    return this.paramDtoValidation.runValidation(paramDto);
  }
}
// todo: fix it