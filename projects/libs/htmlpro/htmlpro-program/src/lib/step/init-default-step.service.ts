import { singleton } from "tsyringe";
import {
  EmptyHtmlProCommandModel,
  InitDefaultHtmlProProgramModel
} from "@lib/htmlpro-domain";
import { HTML_PRO_LOGO } from "@lib/htmlpro-const";
import {
  NewlineAppService,
  SimpleMessageAppService
} from "@lib/logger";
import {
  AllProgramInstalledService,
  GoToProjectRootAppService
} from "@lib/program-step";
import {
  HtmlProConfigNotExistAppService
} from "../app-service/html-pro-config-not-exist-app.service";

@singleton()
/**
 * The list of steps for the program init default.
 */
export class InitDefaultStepService {
  constructor(
    private readonly simpleMessage: SimpleMessageAppService,
    private readonly newline: NewlineAppService,
    private readonly allProgramInstalled: AllProgramInstalledService,
    private readonly goToProjectRoot: GoToProjectRootAppService,
    private readonly htmlProConfigNotExist: HtmlProConfigNotExistAppService
  ) {
  }

  runSteps(
    programModel: InitDefaultHtmlProProgramModel,
    _commandModel: EmptyHtmlProCommandModel
  ): void {
    this.simpleMessage.writeInfo("Init", HTML_PRO_LOGO);
    this.newline.writeNewline();
    if (!this.allProgramInstalled.run()) return;
    if (!this.goToProjectRoot.run()) return;
    const { isForce } = programModel;
    if (!this.htmlProConfigNotExist.run(isForce)) return;
  }
}
