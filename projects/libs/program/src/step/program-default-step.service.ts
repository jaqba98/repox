import { singleton } from "tsyringe";
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

  runSteps(version: boolean): boolean {
    if (version) {
      this.getProgramVersion.run();
    }
    return true;
  }
}
