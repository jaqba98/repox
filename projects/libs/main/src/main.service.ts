import "core-js/features/reflect";
import { ReadParamDtoAppService } from "@lib/parameter";
import { container, singleton } from "tsyringe";
import { LoggerParamErrorAppService } from "@lib/logger";

@singleton()
/**
 * Main launch point of the program.
 */
export class MainService {
  constructor(
    private readonly readParamDtoApp: ReadParamDtoAppService,
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
  }
}

container.resolve(MainService).run();
