// todo: refactor
import { singleton } from "tsyringe";
import {
  ReadParamDtoService
} from "../infrastructure/service/reader/read-param-dto.service";
import {
  ParamDtoModel,
  ParamsDtoValidatorModel
} from "../infrastructure/model/param-dto/param-dto.model";
import {
  ParamDtoValidationService
} from "../infrastructure/service/validation/param-dto-validation.service";

@singleton()
/**
 * The app service is responsible for:
 * 1) Read parameters from shell and save it to parameter DTO model.
 * 2) Validate the parameter DTO model.
 */
export class ReadParamDtoAppService {
  constructor(
    private readonly readParamDto: ReadParamDtoService,
    private readonly paramsDtoValidator: ParamDtoValidationService
  ) {
  }

  read(): {
    paramDto: ParamDtoModel,
    verifyDto: ParamsDtoValidatorModel | true
  } {
    const paramDto = this.readParamDto.read();
    const verifyDto = this.paramsDtoValidator.verify(paramDto);
    return { paramDto, verifyDto };
  }
}
