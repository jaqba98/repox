import { singleton } from "tsyringe";
import { RunProgramModel } from "@lib/model";
import {
  DefaultDefaultHtmlProProgramModel,
  EmptyHtmlProCommandModel
} from "@lib/htmlpro-domain";
import {
  DefaultDefaultStepService
} from "../step/default-default-step.service";

@singleton()
/**
 * The start point of the program default.
 */
export class DefaultDefaultProgramService implements RunProgramModel {
  constructor(private readonly step: DefaultDefaultStepService) {
  }

  runProgram(programDomain: unknown, commandDomain: unknown): void {
    const programModel = <DefaultDefaultHtmlProProgramModel>
      programDomain;
    const commandModel = <EmptyHtmlProCommandModel>commandDomain;
    this.step.runSteps(programModel, commandModel);
  }
}
