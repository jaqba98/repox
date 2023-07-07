import { singleton } from "tsyringe";
import {
  BuildProjectStepService
} from "../step/build-project-step.service";
import {
  // BuildProjectCommandArgDomainModel,
  ParamDomainAppService
} from "@lib/param-domain";
import { RunProgramModel } from "@lib/model";

@singleton()
/**
 * The start point of the build project program.
 */
export class BuildProjectProgramService implements RunProgramModel {
  constructor(
    private readonly step: BuildProjectStepService,
    private readonly getParamDomainData: ParamDomainAppService
  ) {
  }

  runProgram(): void {
    console.log("BuildProjectProgramService");
    // const commandModel = <any>undefined;
    //   // this.getParamDomainData.getParamDomain().command.model;
    // this.step.runSteps(commandModel);
  }
}
// todo: refactor
