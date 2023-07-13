import { singleton } from "tsyringe";
import { RunProgramModel } from "@lib/model";
import {
  GenerateProjectStepService
} from "../step/generate-project-step.service";
import {
  EmptyRepoxProgramModel,
  GenerateProjectRepoxCommandModel
} from "@lib/repox-domain";

@singleton()
/**
 * The start point of the program generate project.
 */
export class GenerateProjectProgramService
  implements RunProgramModel {
  constructor(
    private readonly step: GenerateProjectStepService
  ) {
  }

  runProgram(programDomain: unknown, commandDomain: unknown): void {
    const programModel = <EmptyRepoxProgramModel>programDomain;
    const commandModel = <GenerateProjectRepoxCommandModel>
      commandDomain;
    this.step.runSteps(programModel, commandModel);
  }
}
