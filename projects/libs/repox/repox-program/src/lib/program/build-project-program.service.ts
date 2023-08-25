import { singleton } from "tsyringe";
import { type ProgramModel } from "@lib/model";
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
export class BuildProjectProgramService implements ProgramModel {
  constructor (
    private readonly step: BuildProjectStepService
  ) {
  }

  run (programDomain: unknown, commandDomain: unknown): void {
    const programModel = programDomain as BuildProjectRepoxProgramModel;
    const commandModel = commandDomain as BuildProjectRepoxCommandModel;
    this.step.runSteps(programModel, commandModel);
  }
}
// todo: refactor the file
