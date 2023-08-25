import { singleton } from "tsyringe";
import { type RunProgramModel } from "@lib/model";
import type {
  EmptyRepoxProgramModel,
  LintProjectRepoxCommandModel
} from "@lib/repox-domain";
import {
  LintProjectStepService
} from "../step/lint-project-step.service";

@singleton()
/**
 * The start point of the program lint project.
 */
export class LintProjectProgramService implements RunProgramModel {
  constructor (
    private readonly step: LintProjectStepService
  ) {
  }

  runProgram (programDomain: unknown, commandDomain: unknown): void {
    const programModel = programDomain as EmptyRepoxProgramModel;
    const commandModel = commandDomain as LintProjectRepoxCommandModel;
    this.step.runSteps(programModel, commandModel);
  }
}
// todo: refactor the file
