import { singleton } from "tsyringe";
import { LoggerModeEnum } from "../../enum/logger-mode.enum";
import { LoggerModel } from "../../model/logger.model";
import { ParameterDtoModel } from "../../model/parameter-dto.model";
import { HasToBeOneCommandDtoValidationService } from "./has-to-be-one-command-dto-validation.service";
import { ProgramCanNotHaveValueDtoValidationService } from "./program-can-not-have-value-dto-validation.service";

@singleton()
export class ValidationParameterDtoService {
  constructor(
    private readonly hasToBeOneCommandDtoValidation: HasToBeOneCommandDtoValidationService,
    private readonly programCanNotHaveValueDtoValidation: ProgramCanNotHaveValueDtoValidationService
  ) {}

  validation(parameterDto: ParameterDtoModel): LoggerModel {
    /* Has To Be One Command */
    const hasToBeOneCommand = this.hasToBeOneCommandDtoValidation.run(parameterDto);
    if (hasToBeOneCommand !== true) return hasToBeOneCommand;
    /* Program Can Not Have Value */
    const programCanNotHaveValue = this.programCanNotHaveValueDtoValidation.run(parameterDto);
    if (programCanNotHaveValue !== true) return programCanNotHaveValue;
    /* Success */
    return {
      mode: LoggerModeEnum.success,
      message: "Command executed correctly!",
      newLine: false
    };
  }
}
