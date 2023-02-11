#!/usr/bin/env node

import "core-js/features/reflect";
import { singleton, container } from "tsyringe";
import { ReadParameterAppService } from "./app-service/read-parameter-app.service";
import { LoggerService } from "./infrastructure/service/writer/logger.service";

@singleton()
class Main {
  constructor(
    private readonly readParameterApp: ReadParameterAppService,
    private readonly logger: LoggerService
  ) {}

  run(): void {
    const parameters = this.readParameterApp.run();
    this.logger.log(parameters);
  }
}

container.resolve(Main).run();
