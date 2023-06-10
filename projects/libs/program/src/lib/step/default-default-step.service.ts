import { singleton } from "tsyringe";
import {
  SystemVerificationAppService
} from "../app-service/system-verification-app.service";
import {
  GetProgramVersionAppService
} from "../app-service/get-program-version-app.service";
import {
  DefaultDefaultProgramArgDomainModel
} from "projects/libs/param-domain/src";

@singleton()
/**
 * The list of steps for the program default.
 */
export class DefaultDefaultStepService {
  constructor(
    private readonly systemVerification: SystemVerificationAppService,
    private readonly getProgramVersion: GetProgramVersionAppService
  ) {
  }

  runSteps(programModel: DefaultDefaultProgramArgDomainModel): void {
    // Check the system correctness
    if (!this.systemVerification.checkSystem()) return;
    if (programModel.version) {
      // Display the program version
      this.getProgramVersion.getProgramVersion();
    }
  }
}
