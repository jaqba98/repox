import { singleton } from "tsyringe";
import { LoggerModeEnum } from "../infrastructure/enum/logger-mode.enum";
import { LoggerService } from "../infrastructure/service/logger.service";
import { ReadParameterDtoService } from "../infrastructure/service/read-parameter-dto.service";

@singleton()
export class ReadParameterAppService {
  constructor(
    private readonly readParameterDto: ReadParameterDtoService,
    private readonly logger: LoggerService
  ) { }

  run(): void {
    const parameterDto = this.readParameterDto.read();
    this.logger.log({
      mode: LoggerModeEnum.information,
      message: JSON.stringify(parameterDto, null, 2),
      newLine: true
    });
  }
}
