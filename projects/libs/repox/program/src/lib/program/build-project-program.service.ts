import { singleton } from "tsyringe";
import {
  BuildProjectStepService
} from "../step/build-project-step.service";
import {
  BuildProjectCommandArgDomainModel,
  ParamDomainAppService
} from "@lib/param-domain";

@singleton()
/**
 * The start point of the build project program.
 */
export class BuildProjectProgramService {
  constructor(
    private readonly step: BuildProjectStepService,
    private readonly getParamDomainData: ParamDomainAppService
  ) {
  }

  run(): void {
    const commandModel = <BuildProjectCommandArgDomainModel>
      this.getParamDomainData.getParamDomain().command.model;
    this.step.runSteps(commandModel);
  }
}
// todo: refactor
