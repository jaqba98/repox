import { singleton } from "tsyringe";
import {
  GenerateWorkspaceStepService
} from "../step/generate-workspace-step.service";
import {
  GenerateWorkspaceCommandArgDomainModel,
  GetParamDomainDataAppService
} from "@lib/param-domain";

@singleton()
/**
 * The start point of the generate workspace program.
 */
export class GenerateWorkspaceProgramService {
  constructor(
    private readonly step: GenerateWorkspaceStepService,
    private readonly getParamDomainData: GetParamDomainDataAppService
  ) {
  }

  run(): void {
    const commandModel = <GenerateWorkspaceCommandArgDomainModel>
      this.getParamDomainData.getParamDomain().command.model;
    this.step.runSteps(commandModel);
  }
}
