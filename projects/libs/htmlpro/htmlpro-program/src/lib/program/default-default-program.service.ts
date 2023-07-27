import { singleton } from "tsyringe";
import { RunProgramModel } from "@lib/model";

@singleton()
/**
 * The start point of the program default.
 */
export class DefaultDefaultProgramService implements RunProgramModel {
  runProgram(programDomain: unknown, commandDomain: unknown): void {
  }
}
