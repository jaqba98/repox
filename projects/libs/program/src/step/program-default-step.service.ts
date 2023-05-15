import { singleton } from "tsyringe";
import {
  GetProgramVersionAppService
} from "../app-service/get-program-version-app.service";
import {
  ProgramResultModel
} from "../model/program/program-result.model";

@singleton()
/**
 * The list of steps for the program default program.
 */
export class ProgramDefaultStepService {
  constructor(
    private readonly getProgramVersion: GetProgramVersionAppService
  ) {
  }

  runSteps(version: boolean): ProgramResultModel {
    if (version) {
      this.getProgramVersion.run();
    }
    return { success: true, message: "" };
  }
}
