import { singleton } from "tsyringe";
import {
  BuildProgramModelService
} from "../dom-service/build-program-model.service";
import { LoggerMessageAppService } from "@lib/logger";
import { ParamDomainModel } from "@lib/parameter";
import {
  GenerateProjectModel
} from "../model/program/program-argument.model";

@singleton()
/**
 * The start point of the generate project program.
 */
export class GenerateProjectProgramService {
  constructor(
    private readonly buildCommandModel: BuildProgramModelService,
    private readonly loggerMessageApp: LoggerMessageAppService
  ) {
  }

  run(paramDomain: ParamDomainModel): void {
    const model: GenerateProjectModel = this.buildCommandModel
      .buildGenerateProjectModel(paramDomain);
    this.loggerMessageApp.writeSuccess(
      "The command was executed correctly!", 0
    );
  }
}
