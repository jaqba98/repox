import { singleton } from "tsyringe";
import { DisplayVersionAppService } from "@lib/program-step";
import {
  DefaultDefaultHtmlproProgramModel,
  EmptyHtmlproCommandModel
} from "@lib/htmlpro-domain";
import { HTMLPRO_VERSION } from "@lib/htmlpro-const";

@singleton()
/**
 * The list of steps for the program default.
 */
export class DefaultDefaultStepService {
  constructor(
    private readonly displayVersion: DisplayVersionAppService
  ) {
  }

  runSteps(
    programModel: DefaultDefaultHtmlproProgramModel,
    commandModel: EmptyHtmlproCommandModel
  ): void {
    const { showVersion } = programModel;
    if (showVersion) {
      this.displayVersion.displayRepoxVersion(HTMLPRO_VERSION);
    }
  }
}
