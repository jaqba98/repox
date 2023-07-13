import { singleton } from "tsyringe";
import { RunProgramModel } from "@lib/model";
import {
  DefaultDefaultStepService
} from "../step/default-default-step.service";
import {
  DefaultDefaultRepoxProgramModel,
  EmptyRepoxCommandModel
} from "@lib/repox-domain";

@singleton()
/**
 * The start point of the program default.
 */
export class DefaultDefaultProgramService implements RunProgramModel {
  constructor(private readonly step: DefaultDefaultStepService) {
  }

  runProgram(programDomain: unknown, commandDomain: unknown): void {
    const programModel = <DefaultDefaultRepoxProgramModel>
      programDomain;
    const commandModel = <EmptyRepoxCommandModel>commandDomain;
    this.step.runSteps(programModel, commandModel);
  }
}
