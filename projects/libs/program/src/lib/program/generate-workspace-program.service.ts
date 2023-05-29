import { singleton } from "tsyringe";
import {
  GenerateProjectCommandArgModel,
  GenerateWorkspaceCommandArgModel,
  ParamDomainModel
} from "@lib/param-domain";
import {
  GenerateWorkspaceStepService
} from "../step/generate-workspace-step.service";

@singleton()
/**
 * The start point of the generate workspace program.
 */
export class GenerateWorkspaceProgramService {
  constructor(
    private readonly step: GenerateWorkspaceStepService
  ) {
  }

  run(paramDomain: ParamDomainModel): void {
    const commandModel = <GenerateWorkspaceCommandArgModel>
      paramDomain.command.model;
    this.step.runSteps(commandModel);
  }
}
