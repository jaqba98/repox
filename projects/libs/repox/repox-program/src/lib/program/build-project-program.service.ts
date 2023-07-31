import { singleton } from "tsyringe";
import { RunProgramModel } from "@lib/model";
import {
  BuildProjectStepService
} from "../step/build-project-step.service";
import {
  BuildProjectRepoxCommandModel,
  BuildProjectRepoxProgramModel
} from "@lib/repox-domain";

@singleton()
/**
 * The start point of the program build project.
 */
export class BuildProjectProgramService implements RunProgramModel {
  constructor(
    private readonly step: BuildProjectStepService
  ) {
  }

  runProgram(programDomain: unknown, commandDomain: unknown): void {
    const programModel = <BuildProjectRepoxProgramModel>programDomain;
    const commandModel = <BuildProjectRepoxCommandModel>
      commandDomain;
    this.step.runSteps(programModel, commandModel);
  }
}
