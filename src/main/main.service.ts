import { singleton } from "tsyringe";
import {
  ParameterReaderAppService
} from "../app-service/parameter-reader-app.service";
import { LoggerService } from "../infrastructure/service/writer/logger.service";
import { LoggerModeEnum } from "../infrastructure/enum/logger-mode.enum";

@singleton()
/**
 * The main starting point for the program.
 */
export class MainService {
  constructor(
    private readonly parameterReaderApp: ParameterReaderAppService,
    private readonly logger: LoggerService
  ) {
  }

  run(): void {
    const parameters = this.parameterReaderApp.run();
    this.logger.log({
      mode: LoggerModeEnum.information,
      message: JSON.stringify(parameters, null, 2)
    });
  }
}
