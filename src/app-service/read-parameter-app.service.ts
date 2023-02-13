import { singleton } from "tsyringe";
import { LoggerModel } from "../infrastructure/model/logger.model";
import { ParameterDtoReaderService } from "../infrastructure/service/reader/parameter-dto-reader.service";
import { ValidationParameterDtoService } from "../infrastructure/service/validator/validation-parameter-dto.service";

@singleton()
export class ReadParameterAppService {
  constructor(
    private readonly readParameterDto: ParameterDtoReaderService,
    private readonly validationParameterDto: ValidationParameterDtoService
  ) {}

  run(): LoggerModel {
    const parameterDto = this.readParameterDto.read();
    const validationDto = this.validationParameterDto.validation(parameterDto);
    return validationDto;
  }
}
