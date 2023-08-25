import { singleton } from "tsyringe";
import { type RunProgramModel } from "@lib/model";
import {
  GenerateWorkspaceStepService
} from "../step/generate-workspace-step.service";
import {
  type EmptyRepoxProgramModel,
  type GenerateWorkspaceRepoxCommandModel
} from "@lib/repox-domain";

@singleton()
/**
 * The start point of the program generate workspace.
 */
export class GenerateWorkspaceProgramService
implements RunProgramModel {
  constructor (private readonly step: GenerateWorkspaceStepService) {
  }

  runProgram (programDomain: unknown, commandDomain: unknown): void {
    const programModel = programDomain as EmptyRepoxProgramModel;
    const commandModel = commandDomain as GenerateWorkspaceRepoxCommandModel;
    this.step.runSteps(programModel, commandModel);
  }
}
// todo: refactor the file
