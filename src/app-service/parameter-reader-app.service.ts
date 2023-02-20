import { singleton } from "tsyringe";
import {
  ParameterDtoReaderService
} from "../infrastructure/service/reader/parameter-dto-reader.service";
import {
  ParameterDtoModel
} from "../infrastructure/model/parameter-dto.model";

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
  constructor(private readonly parameterDtoReader: ParameterDtoReaderService) {
  }

  // todo: change ParameterDtoModel to parameter-dto domain model
  run(): ParameterDtoModel {
    return this.parameterDtoReader.read();
  }
}
