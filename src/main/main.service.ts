import { singleton } from "tsyringe";
import {
  ParameterReaderAppService
} from "../app-service/parameter-reader-app.service";
import { LoggerService } from "../infrastructure/service/writer/logger.service";

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
    this.logger.log(JSON.stringify(parameters, null, 2));
  }
}
