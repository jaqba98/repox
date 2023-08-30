import { singleton } from "tsyringe";
import { type ProgramModel } from "@lib/model";
import {
  RegenerateWorkspaceStepService
} from "../step/regenerate-workspace-step.service";
import {
  type EmptyRepoxProgramModel,
  type RegenerateWorkspaceRepoxCommandModel
} from "@lib/repox-domain";

@singleton()
/**
 * The start point of the program regenerate workspace.
 * It regenerates workspace and create stuffs if not exists.
 */
export class RegenerateWorkspaceProgramService
implements ProgramModel {
  constructor (
    private readonly step: RegenerateWorkspaceStepService
  ) {
  }

  run (programDomain: unknown, commandDomain: unknown): void {
    this.step.runSteps(
      programDomain as EmptyRepoxProgramModel,
      commandDomain as RegenerateWorkspaceRepoxCommandModel
    );
  }
}
