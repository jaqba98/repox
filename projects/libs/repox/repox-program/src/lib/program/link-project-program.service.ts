import { singleton } from "tsyringe";
import {
  // BuildLinkProjectCommandArgDomainModel,
  ParamDomainAppService
} from "@lib/param-domain";
import {
  LinkProjectStepService
} from "../step/link-project-step.service";
import { RunProgramModel } from "@lib/model";

@singleton()
/**
 * The start point of the link project program.
 */
export class LinkProjectProgramService implements RunProgramModel {
  constructor(
    private readonly step: LinkProjectStepService,
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
