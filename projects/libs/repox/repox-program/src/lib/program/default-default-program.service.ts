import { singleton } from "tsyringe";
import { type RunProgramModel } from "@lib/model";
import {
  DefaultDefaultStepService
} from "../step/default-default-step.service";
import {
  type DefaultDefaultRepoxProgramModel,
  type EmptyRepoxCommandModel
} from "@lib/repox-domain";

@singleton()
/**
 * The start point of the program default.
 */
export class DefaultDefaultProgramService implements RunProgramModel {
  constructor (private readonly step: DefaultDefaultStepService) {
  }

  runProgram (programDomain: unknown, commandDomain: unknown): void {
    const programModel = programDomain as DefaultDefaultRepoxProgramModel;
    const commandModel = commandDomain as EmptyRepoxCommandModel;
    this.step.runSteps(programModel, commandModel);
  }
}
