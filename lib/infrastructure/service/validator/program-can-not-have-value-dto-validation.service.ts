import { singleton } from "tsyringe";
import { LoggerModeEnum } from "../../enum/logger-mode.enum";
import { ParameterTypeEnum } from "../../enum/parameter-type.enum";
import { LoggerModel } from "../../model/logger.model";
import { ParameterDtoModel } from "../../model/parameter-dto.model";

@singleton()
export class ProgramCanNotHaveValueDtoValidationService {
  run(parameterDto: ParameterDtoModel): LoggerModel | true {
    const programs = parameterDto.parameters
      .filter(parameter => parameter.type === ParameterTypeEnum.program)
      .filter(parameter => parameter.hasValue);
    if (programs.length === 0) return true;
    return {
      mode: LoggerModeEnum.error,
      message: "A parameter validation error occurred!",
      newLine: false
    };
  }
}
