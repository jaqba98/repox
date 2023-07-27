import { singleton } from "tsyringe";
import { RunProgramModel } from "@lib/model";

@singleton()
/**
 * The start point of the program build html.
 */
export class BuildHtmlProgramService implements RunProgramModel {
  runProgram(programDomain: unknown, commandDomain: unknown): void {
    console.log("Build html");
  }
}
