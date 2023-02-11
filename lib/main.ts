#!/usr/bin/env node

import "core-js/features/reflect";
import { container, singleton } from "tsyringe";
import { ReadParameterAppService } from "./app-service/read-parameter-app.service";
import { LoggerModeEnum } from "./infrastructure/enum/logger-mode.enum";
import { LoggerService } from "./infrastructure/service/logger.service";

@singleton()
class Main {
  constructor(
    private readonly readParameterApp: ReadParameterAppService,
    private readonly logger: LoggerService
  ) { }

  run() {
    this.readParameterApp.run();
    this.logger.log({
      mode: LoggerModeEnum.success,
      message: "Command executed correctly",
      newLine: false,
    });
  }
}

container.resolve(Main).run();
