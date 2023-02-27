import { singleton } from "tsyringe";
import {
  ReadParamDtoService
} from "../infra/service/reader/read-param-dto.service";
import {
  ParamsDtoValidatorModel
} from "../infra/model/param-dto.model";
import {
  ParamsDtoValidatorService
} from "../infra/service/validator/params-dto-validator.service";

@singleton()
/**
 * The app service is responsible for:
 * 1) Read parameters from shell and save it to parameter DTO model.
 * 2) Validate the parameter DTO model.
 * 3) Build parameter domain model from parameter DTO model.
 * 4) Validate the parameter domain model.
 * 5) Return the parameter domain model.
 */
export class ReadParamAppService {
  constructor(
    private readonly readParamDto: ReadParamDtoService,
    private readonly paramsDtoValidator: ParamsDtoValidatorService
  ) {
  }

  read(): ParamsDtoValidatorModel {
    const paramsDto = this.readParamDto.read();
    return this.paramsDtoValidator.verify(paramsDto);
  }
}
