import { singleton } from "tsyringe";
import { RunProgramModel } from "@lib/model";
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
 */
export class GenerateWorkspaceProgramService
  implements RunProgramModel {
  constructor(private readonly step: GenerateWorkspaceStepService) {
  }

  runProgram(programDomain: unknown, commandDomain: unknown): void {
    const programModel = <EmptyRepoxProgramModel>programDomain;
    const commandModel = <GenerateWorkspaceRepoxCommandModel>
      commandDomain;
    this.step.runSteps(programModel, commandModel);
  }
}
