import { singleton } from "tsyringe";
import { type ProgramModel } from "@lib/model";
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
 * It generates workspace from zero or
 * regenerate existing workspace if it has permission.
 */
export class GenerateWorkspaceProgramService implements ProgramModel {
  constructor(private readonly step: GenerateWorkspaceStepService) {
  }

  run(programDomain: unknown, commandDomain: unknown): void {
    this.step.runSteps(
      programDomain as EmptyRepoxProgramModel,
      commandDomain as GenerateWorkspaceRepoxCommandModel
    );
  }
}
