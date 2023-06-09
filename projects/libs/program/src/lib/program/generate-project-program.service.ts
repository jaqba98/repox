import { singleton } from "tsyringe";
import {
  GenerateProjectStepService
} from "../step/generate-project-step.service";

@singleton()
/**
 * The start point of the generate project program.
 */
export class GenerateProjectProgramService {
  constructor(
    private readonly step: GenerateProjectStepService
  ) {
  }

  run(): void {
    // const commandModel = <GenerateProjectCommandArgModel>
    //   paramDomain.command.model;
    // this.step.runSteps(commandModel);
  }
}
// todo: refactor