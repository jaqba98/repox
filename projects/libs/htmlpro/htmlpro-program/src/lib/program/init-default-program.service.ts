import { singleton } from "tsyringe";
import { type RunProgramModel } from "@lib/model";
import {
  type EmptyHtmlProCommandModel,
  type InitDefaultHtmlProProgramModel
} from "@lib/htmlpro-domain";
import {
  InitDefaultStepService
} from "../step/init-default-step.service";

@singleton()
/**
 * The start point of the program init default.
 */
export class InitDefaultProgramService implements RunProgramModel {
  constructor (private readonly step: InitDefaultStepService) {
  }

  runProgram (programDomain: unknown, commandDomain: unknown): void {
    const programModel = programDomain as InitDefaultHtmlProProgramModel;
    const commandModel = commandDomain as EmptyHtmlProCommandModel;
    this.step.runSteps(programModel, commandModel);
  }
}
// todo: refactor the file
