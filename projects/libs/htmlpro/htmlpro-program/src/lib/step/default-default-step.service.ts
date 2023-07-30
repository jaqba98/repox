import { singleton } from "tsyringe";
import { DisplayVersionAppService } from "@lib/program-step";
import {
  DefaultDefaultHtmlProProgramModel,
  EmptyHtmlProCommandModel
} from "@lib/htmlpro-domain";
import { HTML_PRO_VERSION } from "@lib/htmlpro-const";

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
    programModel: DefaultDefaultHtmlProProgramModel,
    _commandModel: EmptyHtmlProCommandModel
  ): void {
    const { showVersion } = programModel;
    if (showVersion) {
      this.displayVersion.displayRepoxVersion(HTML_PRO_VERSION);
    }
  }
}
