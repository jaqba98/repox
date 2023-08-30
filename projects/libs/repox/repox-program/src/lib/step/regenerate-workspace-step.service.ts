import { singleton } from "tsyringe";
import {
  type EmptyRepoxProgramModel,
  type RegenerateWorkspaceRepoxCommandModel
} from "@lib/repox-domain";

@singleton()
/**
 * The list of steps for the program generate workspace.
 */
export class RegenerateWorkspaceStepService {
  runSteps (
    _programModel: EmptyRepoxProgramModel,
    commandModel: RegenerateWorkspaceRepoxCommandModel
  ): void {
    console.log(commandModel);
  }
}
// todo: refactor the file
