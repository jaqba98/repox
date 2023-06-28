import { singleton } from "tsyringe";
import {
  // BuildUnlinkProjectCommandArgDomainModel,
  ParamDomainAppService
} from "@lib/param-domain";
import {
  UnlinkProjectStepService
} from "../step/unlink-project-step.service";

@singleton()
/**
 * The start point of the unlink project program.
 */
export class UnlinkProjectProgramService {
  constructor(
    private readonly step: UnlinkProjectStepService,
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
