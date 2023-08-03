import { singleton } from "tsyringe";
import { type RunProgramModel } from "@lib/model";
import {
  type DefaultDefaultHtmlProProgramModel,
  type EmptyHtmlProCommandModel
} from "@lib/htmlpro-domain";
import {
  DefaultDefaultStepService
} from "../step/default-default-step.service";

@singleton()
/**
 * The start point of the program default.
 */
export class DefaultDefaultProgramService implements RunProgramModel {
  constructor (private readonly step: DefaultDefaultStepService) {
  }

  runProgram (programDomain: unknown, commandDomain: unknown): void {
    const programModel = programDomain as DefaultDefaultHtmlProProgramModel;
    const commandModel = commandDomain as EmptyHtmlProCommandModel;
    this.step.runSteps(programModel, commandModel);
  }
}
