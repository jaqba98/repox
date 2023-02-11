import { singleton } from "tsyringe";
import { LoggerModeEnum } from "../../enum/logger-mode.enum";
import { ParameterTypeEnum } from "../../enum/parameter-type.enum";
import { LoggerModel } from "../../model/logger.model";
import { ParameterDtoModel } from "../../model/parameter-dto.model";
import { HasToBeOneCommandDtoValidationService } from "./has-to-be-one-command-dto-validation.service";

@singleton()
export class ValidationParameterDtoService {
  constructor(
    private readonly hasToBeOneCommandDtoValidation: HasToBeOneCommandDtoValidationService
  ) {}

  validation(parameterDto: ParameterDtoModel): LoggerModel {
    /* Has To Be One Command */
    const hasToBeOneCommand = this.hasToBeOneCommandDtoValidation.run(parameterDto);
    if (hasToBeOneCommand !== true) return hasToBeOneCommand;
    /* Success */
    return {
      mode: LoggerModeEnum.success,
      message: "Command executed correctly!",
      newLine: false
    };
  }
}
