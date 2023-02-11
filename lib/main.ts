#!/usr/bin/env node

import "core-js/features/reflect";
import { container, singleton } from "tsyringe";
import { ReadParamsAppSvc } from "./app-service/read-params-app.service";
import { LogSvc } from "./infrastructure/service/logger.service";

@singleton()
/**
 * Start point of the program.
 * It gets the parameters from the command line
 * and then it selects the correct program.
 */
class Main {
  constructor(
    private readonly readParamsApp: ReadParamsAppSvc,
    private readonly log: LogSvc
  ) { }

  run() {
    const params = this.readParamsApp.run();
    this.log.write({
      mode: "succ",
      msg: "Command executed correctly!",
      newLine: false,
    });
  }
}

container.resolve(Main).run();
