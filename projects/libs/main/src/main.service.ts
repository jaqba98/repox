import "core-js/features/reflect";
import {
  ReadParamDomainAppService,
  ReadParamDtoAppService
} from "@lib/parameter";
import { container, singleton } from "tsyringe";
import { LoggerParamErrorAppService } from "@lib/logger";

@singleton()
/**
 * Main launch point of the program.
 */
export class MainService {
  constructor(
    private readonly readParamDtoApp: ReadParamDtoAppService,
    private readonly readParamDomainApp: ReadParamDomainAppService,
    private readonly loggerParamErrorApp: LoggerParamErrorAppService,
  ) {
  }

  run(): void {
    const paramDto = this.readParamDtoApp.read();
    if (!paramDto.success) {
      this.loggerParamErrorApp.writeParamError(
        paramDto.wrongParamIndexes,
        paramDto.baseValues,
        paramDto.errors,
        paramDto.tips
      );
      return;
    }
    const paramDomain = this.readParamDomainApp.build(
      paramDto.paramDto
    );
    if (!paramDomain.success) {
      this.loggerParamErrorApp.writeParamError(
        paramDomain.wrongParamIndexes,
        paramDto.baseValues,
        paramDomain.errors,
        paramDomain.tips
      );
      return;
    }
  }
}

container.resolve(MainService).run();
