import { singleton } from "tsyringe";
import { type RunProgramModel } from "@lib/model";
import {
  BuildProjectStepService
} from "../step/build-project-step.service";
import {
  type BuildProjectRepoxCommandModel,
  type BuildProjectRepoxProgramModel
} from "@lib/repox-domain";

@singleton()
/**
 * The start point of the program build project.
 */
export class BuildProjectProgramService implements RunProgramModel {
  constructor (
    private readonly step: BuildProjectStepService
  ) {
  }

  runProgram (programDomain: unknown, commandDomain: unknown): void {
    const programModel = programDomain as BuildProjectRepoxProgramModel;
    const commandModel = commandDomain as BuildProjectRepoxCommandModel;
    this.step.runSteps(programModel, commandModel);
  }
}
