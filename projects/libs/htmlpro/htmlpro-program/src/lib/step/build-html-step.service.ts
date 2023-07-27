import { singleton } from "tsyringe";
import {
  NewlineAppService,
  SimpleMessageAppService
} from "@lib/logger";
import { HTMLPRO_LOGO } from "@lib/htmlpro-const";
import {
  BuildHtmlHtmlproCommandModel,
  EmptyHtmlproProgramModel
} from "@lib/htmlpro-domain";
import {
  ChangePathAppService,
  GoToProjectRootAppService
} from "@lib/program-step";
import {
  BuildHtmlAppService
} from "../app-service/build-html-app.service";

@singleton()
/**
 * The list of steps for the program build html.
 */
export class BuildHtmlStepService {
  constructor(
    private readonly simpleMessage: SimpleMessageAppService,
    private readonly newline: NewlineAppService,
    private readonly goToProjectRoot: GoToProjectRootAppService,
    private readonly changePath: ChangePathAppService,
    private readonly buildHtml: BuildHtmlAppService
  ) {
  }

  runSteps(
    programModel: EmptyHtmlproProgramModel,
    commandModel: BuildHtmlHtmlproCommandModel
  ): void {
    this.simpleMessage.writeInfo("Build html", HTMLPRO_LOGO);
    if (!this.goToProjectRoot.run()) return;
    const { filePath } = commandModel;
    if (!this.changePath.run(filePath)) return;
    if (!this.buildHtml.run(filePath)) return;
    this.newline.writeNewline();
    this.simpleMessage.writeSuccess(
      "Html file builded successfully!"
    );
  }
}
