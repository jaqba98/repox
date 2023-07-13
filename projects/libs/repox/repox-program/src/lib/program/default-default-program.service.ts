import { singleton } from "tsyringe";
import { RunProgramModel } from "@lib/model";
import {
  DefaultDefaultStepService
} from "../step/default-default-step.service";

@singleton()
/**
 * The start point of the program default.
 */
export class DefaultDefaultProgramService implements RunProgramModel {
  constructor(
    private readonly defaultDefaultStep: DefaultDefaultStepService
  ) {
  }

  runProgram(programDomain: unknown, commandDomain: unknown): void {
    console.log("DefaultDefaultProgramService")
    // const programModel = <DefaultDefaultRepoxProgramModel>
    //   programDomain;
    // this.defaultDefaultStep.runSteps(programModel);
  }
}
// todo: refactor
