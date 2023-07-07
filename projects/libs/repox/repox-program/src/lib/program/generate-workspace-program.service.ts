import { singleton } from "tsyringe";
import {
  GenerateWorkspaceStepService
} from "../step/generate-workspace-step.service";
import {
  // GenerateWorkspaceCommandArgDomainModel,
  ParamDomainAppService
} from "@lib/param-domain";
import { RunProgramModel } from "@lib/model";

@singleton()
/**
 * The start point of the generate workspace program.
 */
export class GenerateWorkspaceProgramService implements RunProgramModel {
  constructor(
    private readonly step: GenerateWorkspaceStepService,
    private readonly getParamDomainData: ParamDomainAppService
  ) {
  }

  runProgram(): void {
    console.log("GenerateWorkspaceProgramService");
    // const commandModel = <any>undefined;
    //   // this.getParamDomainData.getParamDomain().command.model;
    // this.step.runSteps(commandModel);
  }
}
// todo: refactor
