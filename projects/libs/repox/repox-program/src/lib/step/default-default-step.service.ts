import { singleton } from "tsyringe";
import {
  RepoxVersionAppService
} from "../app-service/repox-version-app.service";
import {
  DefaultDefaultRepoxProgramModel,
  EmptyRepoxCommandModel
} from "@lib/repox-domain";

@singleton()
/**
 * The list of steps for the program default.
 */
export class DefaultDefaultStepService {
  constructor(
    private readonly programVersion: RepoxVersionAppService
  ) {
  }

  runSteps(
    programModel: DefaultDefaultRepoxProgramModel,
    commandModel: EmptyRepoxCommandModel
  ): void {
    const { showVersion } = programModel;
    if (showVersion) {
      this.programVersion.displayRepoxVersion();
    }
  }
}
