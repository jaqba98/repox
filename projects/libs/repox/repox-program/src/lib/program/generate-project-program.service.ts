import { singleton } from "tsyringe";
import { type ProgramModel } from "@lib/model";
import {
  GenerateProjectStepService
} from "../step/generate-project-step.service";
import {
  type EmptyRepoxProgramModel,
  type GenerateProjectRepoxCommandModel
} from "@lib/repox-domain";

@singleton()
/**
 * The start point of the program generate project.
 */
export class GenerateProjectProgramService
implements ProgramModel {
  constructor (
    private readonly step: GenerateProjectStepService
  ) {
  }

  run (programDomain: unknown, commandDomain: unknown): void {
    const programModel = programDomain as EmptyRepoxProgramModel;
    const commandModel = commandDomain as GenerateProjectRepoxCommandModel;
    this.step.runSteps(programModel, commandModel);
  }
}
// todo: refactor the file
