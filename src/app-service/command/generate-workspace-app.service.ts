import { singleton } from "tsyringe";
import {
  EmptyArgsModel,
  ProgramGenerateCommandWorkspaceArgsModel
} from "../../model/param-domain/param-domain.model";

@singleton()
/**
 * The service is responsible for generate workspace.
 */
export class GenerateWorkspaceAppService {
  run(
    programArgs: EmptyArgsModel,
    commandArgs: ProgramGenerateCommandWorkspaceArgsModel
  ): void {
    console.log("Program args");
    console.log(programArgs);
    console.log("Command args");
    console.log(commandArgs);
  }
}
