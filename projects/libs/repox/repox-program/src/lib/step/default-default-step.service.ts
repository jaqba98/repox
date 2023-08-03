import { singleton } from "tsyringe";
import { DisplayVersionAppService } from "@lib/program-step";
import {
  type DefaultDefaultRepoxProgramModel,
  type EmptyRepoxCommandModel
} from "@lib/repox-domain";
import { REPOX_VERSION } from "@lib/repox-const";

@singleton()
/**
 * The list of steps for the program default.
 */
export class DefaultDefaultStepService {
  constructor (
    private readonly displayVersion: DisplayVersionAppService
  ) {
  }

  runSteps (
    programModel: DefaultDefaultRepoxProgramModel,
    commandModel: EmptyRepoxCommandModel
  ): void {
    const { showVersion } = programModel;
    if (showVersion) {
      this.displayVersion.displayRepoxVersion(REPOX_VERSION);
    }
  }
}
