#!/usr/bin/env node

import "core-js/features/reflect";
import { container, singleton } from "tsyringe";
import { ReadParamsAppSvc } from "./app-svc/read-params-app.svc";
import { LogSvc } from "./infra/svc/writer/log.svc";

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
  ) {}

  run() {
    const params = this.readParamsApp.run();
    this.log.write({
      mode: "info",
      msg: JSON.stringify(params, null, 2),
      newLine: true,
    });
    this.log.write({
      mode: "succ",
      msg: "Command executed correctly!",
      newLine: false,
    });
  }
}

container.resolve(Main).run();
