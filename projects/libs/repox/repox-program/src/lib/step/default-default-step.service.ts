import { singleton } from "tsyringe";
import {
  ProgramVersionAppService
} from "../app-service/program-version-app.service";
import {
  DefaultDefaultRepoxProgramDomainModel
} from "@lib/repox-domain";

@singleton()
/**
 * The list of steps for the program default.
 */
export class DefaultDefaultStepService {
  constructor(
    private readonly programVersion: ProgramVersionAppService
  ) {
  }

  runSteps(programModel: DefaultDefaultRepoxProgramDomainModel): void {
    if (programModel.showVersion) {
      this.programVersion.showProgramVersion();
    }
  }
}
