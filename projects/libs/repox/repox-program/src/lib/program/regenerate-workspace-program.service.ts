import { singleton } from "tsyringe";
import { type ProgramModel } from "@lib/model";

@singleton()
/**
 * The start point of the program regenerate workspace.
 * It regenerates workspace and create stuffs if not exists.
 */
export class RegenerateWorkspaceProgramService
implements ProgramModel {
  run (_programDomain: unknown, _commandDomain: unknown): void {
    console.log(`RegenerateWorkspaceProgramService`);
  }
}
// todo: refactor the file
