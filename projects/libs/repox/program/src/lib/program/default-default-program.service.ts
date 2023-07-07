import { singleton } from "tsyringe";
import {
  DefaultDefaultStepService
} from "../step/default-default-step.service";
import {
  // DefaultDefaultProgramArgDomainModel,
  ParamDomainAppService
} from "@lib/param-domain";
import { RunProgramModel } from "@lib/model";

@singleton()
/**
 * The start point of the program default.
 */
export class DefaultDefaultProgramService implements RunProgramModel {
  constructor(
    private readonly defaultDefaultStep: DefaultDefaultStepService,
    private readonly getParamDomainData: ParamDomainAppService
  ) {
  }

  runProgram(): void {
    const programModel = <any>undefined;
      // this.getParamDomainData.getParamDomain().program.model;
    this.defaultDefaultStep.runSteps(programModel);
  }
}
// todo: refactor
