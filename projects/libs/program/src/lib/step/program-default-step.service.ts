import { singleton } from "tsyringe";
import { DefaultProgramArgModel } from "@lib/param-domain";
import {
  GetProgramVersionAppService
} from "../app-service/get-program-version-app.service";
import {
  SystemVerificationAppService
} from "../app-service/system-verification-app.service";

@singleton()
/**
 * The list of steps for the program default program.
 */
export class ProgramDefaultStepService {
  constructor(
    private readonly systemVerification: SystemVerificationAppService,
    private readonly getProgramVersion: GetProgramVersionAppService
  ) {
  }

  runSteps(programModel: DefaultProgramArgModel): void {
    if (!this.systemVerification.checkSystem()) return;
    if (programModel.version) {
      this.getProgramVersion.getProgramVersion();
    }
  }
}
