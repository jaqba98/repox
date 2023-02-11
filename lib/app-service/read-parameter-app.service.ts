import { singleton } from "tsyringe";
import { LoggerModel } from "../infrastructure/model/logger.model";
import { ReadParameterDtoService } from "../infrastructure/service/reader/read-parameter-dto.service";
import { ValidationParameterDtoService } from "../infrastructure/service/validator/validation-parameter-dto.service";

@singleton()
export class ReadParameterAppService {
  constructor(
    private readonly readParameterDto: ReadParameterDtoService,
    private readonly validationParameterDto: ValidationParameterDtoService
  ) {}

  run(): LoggerModel {
    const parameterDto = this.readParameterDto.read();
    const validationDto = this.validationParameterDto.validation(parameterDto);
    return validationDto;
  }
}
