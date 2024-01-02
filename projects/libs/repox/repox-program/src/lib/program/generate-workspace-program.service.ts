import { singleton } from "tsyringe";
import { ProgramModel } from "@lib/model";
import {
  GenerateWorkspaceStepService
} from "../step/generate-workspace-step.service";
import {
  EmptyRepoxProgramModel,
  GenerateWorkspaceRepoxCommandModel
} from "@lib/repox-domain";

@singleton()
/**
 * The start point of the program generate workspace.
 * It generates workspace from zero.
 */
export class GenerateWorkspaceProgramService implements ProgramModel {
  constructor(private readonly step: GenerateWorkspaceStepService) {
  }

  runProgram(programDomain: unknown, commandDomain: unknown): void {
    this.step.runSteps(
      programDomain as EmptyRepoxProgramModel,
      commandDomain as GenerateWorkspaceRepoxCommandModel
    );
  }
}
