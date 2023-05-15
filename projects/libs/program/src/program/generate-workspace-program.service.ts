import { singleton } from "tsyringe";
import {
  BuildProgramModelService
} from "../dom-service/build-program-model.service";
import { LoggerMessageAppService } from "@lib/logger";
import { ParamDomainModel } from "@lib/parameter";
import {
  GenerateWorkspaceModel
} from "../model/program/program-argument.model";
import {
  GenerateWorkspaceStepService
} from "../step/generate-workspace-step.service";

@singleton()
/**
 * The start point of the generate workspace program.
 */
export class GenerateWorkspaceProgramService {
  constructor(
    private readonly buildCommandModel: BuildProgramModelService,
    private readonly generateWorkspaceStep: GenerateWorkspaceStepService,
    private readonly loggerMessageApp: LoggerMessageAppService
  ) {
  }

  run(paramDomain: ParamDomainModel): void {
    const model: GenerateWorkspaceModel = this.buildCommandModel
      .buildGenerateWorkspaceModel(paramDomain);
    const { name } = model;
    if (this.generateWorkspaceStep.runSteps(name)) {
      this.loggerMessageApp.writeSuccess(
        "The command was executed correctly!", 0
      );
      return;
    }
    this.loggerMessageApp.writeError(
      "An error occurred while executing the command!", 0
    );
  }
}
