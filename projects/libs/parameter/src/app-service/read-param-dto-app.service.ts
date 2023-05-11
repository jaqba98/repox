import { singleton } from "tsyringe";
import {
  BuildParamDtoService
} from "../dom-service/builder/build-param-dto.service";
import {
  ParamDtoValidationService
} from "../dom-service/validation-dto/param-dto-validation.service";
import {
  ParamDtoValidationModel
} from "../model/param-dto/param-dto-validation.model";
import { ReadArgvService } from "../infrastructure/read-argv.service";

@singleton()
/**
 * The app service is responsible for read and validate
 * parameter DTO model from program line.
 */
export class ReadParamDtoAppService {
  constructor(
    private readonly readArgv: ReadArgvService,
    private readonly buildParamDto: BuildParamDtoService,
    private readonly paramDtoValidation: ParamDtoValidationService
  ) {
  }

  read(): ParamDtoValidationModel {
    const argv = this.readArgv.getArgv();
    const paramDto = this.buildParamDto.readParamDto(argv);
    return this.paramDtoValidation.runValidation(paramDto);
  }
}
