import { singleton } from "tsyringe";
import {
  ProgramVersionAppService
} from "../app-service/program-version-app.service";
import {
  DefaultDefaultRepoxProgramDomainModel
} from "@lib/repox-domain";
import {
  SystemVerificationAppService
} from "../app-service/system-verification-app.service";

@singleton()
/**
 * The list of steps for the program default.
 */
export class DefaultDefaultStepService {
  constructor(
    private readonly systemVerification: SystemVerificationAppService,
    private readonly programVersion: ProgramVersionAppService
  ) {
  }

  runSteps(programModel: DefaultDefaultRepoxProgramDomainModel): void {
    if (!this.systemVerification.run()) return;
    if (programModel.showVersion) {
      this.programVersion.showProgramVersion();
    }
  }
}
// todo: refactor
