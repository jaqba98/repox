import { singleton } from "tsyringe";
import { DefaultProgramArgModel } from "@lib/param-domain";
import {
  GetProgramVersionAppService
} from "../app-service/get-program-version-app.service";

@singleton()
/**
 * The list of steps for the program default program.
 */
export class ProgramDefaultStepService {
  constructor(
    private readonly getProgramVersion: GetProgramVersionAppService
  ) {
  }

  runSteps(programModel: DefaultProgramArgModel): void {
    if (programModel.version) {
      this.getProgramVersion.getProgramVersion();
    }
  }
}
