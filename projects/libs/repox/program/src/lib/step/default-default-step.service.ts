import { singleton } from "tsyringe";
import {
  GetProgramVersionAppService
} from "../app-service/get-program-version-app.service";
// import {
//   DefaultDefaultProgramArgDomainModel
// } from "@lib/param-domain";

@singleton()
/**
 * The list of steps for the program default.
 */
export class DefaultDefaultStepService {
  constructor(
    private readonly getProgramVersion: GetProgramVersionAppService
  ) {
  }

  runSteps(programModel: any): void {
    if (programModel.version) {
      // Display the program version
      this.getProgramVersion.getProgramVersion();
    }
  }
}
// todo: refactor
