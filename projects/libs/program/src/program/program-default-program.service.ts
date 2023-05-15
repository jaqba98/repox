import { singleton } from "tsyringe";
import {
  BuildProgramModelService
} from "../dom-service/build-program-model.service";
import {
  ProgramDefaultStepService
} from "../step/program-default-step.service";
import { LoggerMessageAppService } from "@lib/logger";
import { ParamDomainModel } from "@lib/parameter";
import {
  ProgramDefaultModel
} from "../model/program/program-argument.model";

@singleton()
/**
 * The start point of the program default.
 */
export class ProgramDefaultProgramService {
  constructor(
    private readonly buildCommandModel: BuildProgramModelService,
    private readonly programDefaultStep: ProgramDefaultStepService,
    private readonly loggerMessageApp: LoggerMessageAppService
  ) {
  }

  run(paramDomain: ParamDomainModel): void {
    const model: ProgramDefaultModel = this.buildCommandModel
      .buildProgramDefaultModel(paramDomain);
    const { version } = model;
    const result = this.programDefaultStep.runSteps(version);
    if (result.message === "") {
      return;
    }
    if (result.success) {
      this.loggerMessageApp.writeSuccess(result.message, 0);
      return;
    }
    this.loggerMessageApp.writeError(result.message, 0);
  }
}
