import { singleton } from "tsyringe";
import {
  BuildProjectCommandArgModel,
  ParamDomainModel
} from "@lib/param-domain";
import {
  BuildProjectStepService
} from "../step/build-project-step.service";

@singleton()
/**
 * The start point of the build project program.
 */
export class BuildProjectProgramService {
  constructor(
    private readonly step: BuildProjectStepService
  ) {
  }

  run(paramDomain: ParamDomainModel): void {
    const commandModel = <BuildProjectCommandArgModel>
      paramDomain.command.model;
    this.step.runSteps(commandModel);
  }
}