import { singleton } from "tsyringe";
import {
  GenerateProjectStepService
} from "../step/generate-project-step.service";
import {
  GenerateProjectCommandArgDomainModel,
  GetParamDomainDataAppService
} from "@lib/param-domain";

@singleton()
/**
 * The start point of the generate project program.
 */
export class GenerateProjectProgramService {
  constructor(
    private readonly step: GenerateProjectStepService,
    private readonly getParamDomainData: GetParamDomainDataAppService
  ) {
  }

  run(): void {
    const commandModel = <GenerateProjectCommandArgDomainModel>
      this.getParamDomainData.getParamDomain().command.model;
    this.step.runSteps(commandModel);
  }
}
