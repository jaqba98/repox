import { singleton } from "tsyringe";
import { RunProgramModel } from "@lib/model";
import {
  GenerateWorkspaceRepoxCommandModel
} from "@lib/repox-domain";
import {
  GenerateWorkspaceStepService
} from "../step/generate-workspace-step.service";

@singleton()
/**
 * The start point of the program generate workspace.
 */
export class GenerateWorkspaceProgramService implements RunProgramModel {
  constructor(
    private readonly generateWorkspaceStep: GenerateWorkspaceStepService
  ) {
  }

  runProgram(programDomain: unknown, commandDomain: unknown): void {
    const commandModel = <GenerateWorkspaceRepoxCommandModel>
      commandDomain;
    this.generateWorkspaceStep.runSteps(commandModel);
  }
}
// todo: refactor
