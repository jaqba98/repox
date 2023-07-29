import { singleton } from "tsyringe";
import { RunProgramModel } from "@lib/model";
import {
  DefaultDefaultHtmlproProgramModel,
  EmptyHtmlproCommandModel
} from "@lib/htmlpro-domain";

@singleton()
/**
 * The start point of the program default.
 */
export class DefaultDefaultProgramService implements RunProgramModel {
  runProgram(programDomain: unknown, commandDomain: unknown): void {
    const programModel = <DefaultDefaultHtmlproProgramModel>
      programDomain;
    const commandModel = <EmptyHtmlproCommandModel>commandDomain;
    console.log(programModel.showVersion);
  }
}
