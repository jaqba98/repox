import { singleton } from "tsyringe";
import {
  GenerateProjectCommandArgModel,
  ParamDomainModel
} from "@lib/param-domain";
import {
  GenerateProjectStepService
} from "../step/generate-project-step.service";

@singleton()
/**
 * The start point of the generate project program.
 */
export class GenerateProjectProgramService {
  constructor(
    private readonly step: GenerateProjectStepService
  ) {
  }

  run(paramDomain: ParamDomainModel): void {
    const commandModel = <GenerateProjectCommandArgModel>
      paramDomain.command.model;
    this.step.runSteps(commandModel);
  }
}
// todo: refactor