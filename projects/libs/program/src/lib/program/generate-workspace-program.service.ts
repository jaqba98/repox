import { singleton } from "tsyringe";
import {
  GenerateWorkspaceStepService
} from "../step/generate-workspace-step.service";

@singleton()
/**
 * The start point of the generate workspace program.
 */
export class GenerateWorkspaceProgramService {
  constructor(
    private readonly step: GenerateWorkspaceStepService
  ) {
  }

  run(): void {
    // const commandModel = <GenerateWorkspaceCommandArgModel>
    //   paramDomain.command.model;
    // this.step.runSteps(commandModel);
  }
}
// todo: refactor