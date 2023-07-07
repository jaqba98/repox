import { singleton } from "tsyringe";
import {
  // BuildUnlinkProjectCommandArgDomainModel,
  ParamDomainAppService
} from "@lib/param-domain";
import {
  UnlinkProjectStepService
} from "../step/unlink-project-step.service";
import { RunProgramModel } from "@lib/model";

@singleton()
/**
 * The start point of the unlink project program.
 */
export class UnlinkProjectProgramService implements RunProgramModel {
  constructor(
    private readonly step: UnlinkProjectStepService,
    private readonly getParamDomainData: ParamDomainAppService
  ) {
  }

  runProgram(): void {
    const commandModel = <any>undefined;
      // this.getParamDomainData.getParamDomain().command.model;
    this.step.runSteps(commandModel);
  }
}
// todo: refactor
