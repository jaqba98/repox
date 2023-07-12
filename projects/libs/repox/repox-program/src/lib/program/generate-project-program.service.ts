import { singleton } from "tsyringe";
import { RunProgramModel } from "@lib/model";
import {
  GenerateProjectRepoxCommandModel
} from "@lib/repox-domain";
import {
  GenerateProjectStepService
} from "../step/generate-project-step.service";

@singleton()
/**
 * The program service is responsible for starting the process
 * of generating a new project.
 */
export class GenerateProjectProgramService implements RunProgramModel {
  constructor(
    private readonly generateProjectStep: GenerateProjectStepService
  ) {
  }

  runProgram(programDomain: unknown, commandDomain: unknown): void {
    const commandModel = <GenerateProjectRepoxCommandModel>
      commandDomain;
    this.generateProjectStep.runSteps(commandModel);
  }
}
// todo: refactor
