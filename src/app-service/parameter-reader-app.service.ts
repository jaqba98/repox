import { singleton } from "tsyringe";
import {
  ParameterDtoReaderService
} from "../infrastructure/service/reader/parameter-dto-reader.service";
import {
  ParameterDtoValidationService
} from "../infrastructure/service/validation/parameter-dto-validation.service";
import { LoggerService } from "../infrastructure/service/writer/logger.service";
import {
  ParameterDtoErrorBuilderService
} from "../infrastructure/service/builder/parameter-dto-error-builder.service";

@singleton()
/**
 * The app service is responsible for:
 * 1) Read parameters from command line and save to dto model.
 * 2) Verification the dto model.
 * 3) Build parameters domain model from dto model.
 * 4) Verification the domain model.
 * 5) Return the domain model.
 */
export class ParameterReaderAppService {
  constructor(
    private readonly parameterDtoReader: ParameterDtoReaderService,
    private readonly parameterDtoValidation: ParameterDtoValidationService,
    private readonly parameterDtoErrorBuilder: ParameterDtoErrorBuilderService,
    private readonly logger: LoggerService
  ) {
  }

  run(): void {
    const parameterDto = this.parameterDtoReader.read();
    const validationDto = this.parameterDtoValidation.validation(parameterDto);
    if (validationDto.error) {
      this.logger.log(
        this.parameterDtoErrorBuilder.build(parameterDto, validationDto)
      );
    }
  }
}
