import { singleton } from "tsyringe";
import { RunProgramModel } from "@lib/model";
import {
  DefaultDefaultHtmlproProgramModel,
  EmptyHtmlproCommandModel
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
    const programModel = <DefaultDefaultHtmlproProgramModel>
      programDomain;
    const commandModel = <EmptyHtmlproCommandModel>commandDomain;
    this.step.runSteps(programModel, commandModel);
  }
}
