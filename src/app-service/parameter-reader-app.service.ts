import { singleton } from "tsyringe";
import {
  ParameterDtoReaderService
} from "../infrastructure/service/reader/parameter-dto-reader.service";
import {
  ParameterDtoValidationService
} from "../infrastructure/service/validation/parameter-dto-validation.service";
import {
  ParameterDtoValidationModel
} from "../infrastructure/model/parameter-dto-validation.model";

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
    private readonly parameterDtoValidation: ParameterDtoValidationService
  ) {
  }

  run(): ParameterDtoValidationModel {
    const parameterDto = this.parameterDtoReader.read();
    return this.parameterDtoValidation.validation(parameterDto);
  }
}
