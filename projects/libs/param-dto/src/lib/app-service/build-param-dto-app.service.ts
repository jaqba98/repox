import { singleton } from "tsyringe";
import { ReadArgvService } from "../infrastructure/read-argv.service";
import {
  BuildParamDtoService
} from "../dom-service/builder/build-param-dto.service";
import {
  ValidationParamDtoService
} from "../dom-service/validation/validation-param-dto.service";

@singleton()
/**
 * The app service is responsible for build and validate
 * parameter DTO model from command line.
 */
export class BuildParamDtoAppService {
  constructor (
    private readonly readArgv: ReadArgvService,
    private readonly buildParamDto: BuildParamDtoService,
    private readonly validationParamDto: ValidationParamDtoService
  ) {
  }

  build (): void {
    const argv = this.readArgv.getArgv();
    this.buildParamDto.buildParamDto(argv);
    this.validationParamDto.runValidation();
  }
}
// todo: refactor the file
