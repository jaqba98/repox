import "core-js/features/reflect";
import { singleton, container } from "tsyringe";
import { ParameterReaderAppService } from "./app-service/parameter-reader-app.service";
import { LoggerService } from "./infrastructure/service/writer/logger.service";

@singleton()
class Main {
  constructor(
    private readonly readParameterApp: ParameterReaderAppService,
    private readonly logger: LoggerService
  ) {}

  run(): void {
    const parameters = this.readParameterApp.run();
    this.logger.log(parameters);
  }
}

container.resolve(Main).run();
