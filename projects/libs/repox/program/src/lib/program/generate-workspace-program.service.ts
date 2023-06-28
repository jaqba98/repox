import { singleton } from "tsyringe";
import {
  GenerateWorkspaceStepService
} from "../step/generate-workspace-step.service";
import {
  // GenerateWorkspaceCommandArgDomainModel,
  ParamDomainAppService
} from "@lib/param-domain";

@singleton()
/**
 * The start point of the generate workspace program.
 */
export class GenerateWorkspaceProgramService {
  constructor(
    private readonly step: GenerateWorkspaceStepService,
    private readonly getParamDomainData: ParamDomainAppService
  ) {
  }

  run(): void {
    const commandModel = <any>
      this.getParamDomainData.getParamDomain().command.model;
    this.step.runSteps(commandModel);
  }
}
// todo: refactor
