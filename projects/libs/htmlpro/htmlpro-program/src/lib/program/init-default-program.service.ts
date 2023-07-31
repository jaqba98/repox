import { singleton } from "tsyringe";
import { RunProgramModel } from "@lib/model";
import {
  DefaultDefaultHtmlProProgramModel,
  InitDefaultHtmlProProgramModel
} from "@lib/htmlpro-domain";
import {
  InitDefaultStepService
} from "../step/init-default-step.service";

@singleton()
/**
 * The start point of the program init default.
 */
export class InitDefaultProgramService implements RunProgramModel {
  constructor(private readonly step: InitDefaultStepService) {
  }

  runProgram(programDomain: unknown, commandDomain: unknown): void {
    const programModel = <InitDefaultHtmlProProgramModel>
      programDomain;
    const commandModel = <DefaultDefaultHtmlProProgramModel>
      commandDomain;
    this.step.runSteps(programModel, commandModel);
  }
}
