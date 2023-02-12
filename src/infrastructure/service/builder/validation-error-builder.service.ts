import { singleton } from "tsyringe";
import { LoggerModeEnum } from "../../enum/logger-mode.enum";
import { LoggerModel } from "../../model/logger.model";
import { ParameterDtoModel } from "../../model/parameter-dto.model";

@singleton()
export class ValidationErrorBuilderService {
  build(parameterDto: ParameterDtoModel, message: string): LoggerModel {
    const command = parameterDto.parameters.map(parameter => parameter.baseValue).join(" ");
    const test = `
  Failed to run command: ${command}
  ${message}
    `;
    return {
      mode: LoggerModeEnum.error,
      message: test,
      newLine: true
    }
  }
}
