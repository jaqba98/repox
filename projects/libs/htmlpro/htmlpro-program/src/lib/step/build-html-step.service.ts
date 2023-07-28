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
import { GoToProjectRootAppService } from "@lib/program-step";
import {
  BuildHtmlAppService
} from "../app-service/build-html-app.service";
import { PathUtilsService } from "@lib/utils";
import {
  LoadHtmlproDomainAppService
} from "../app-service/load-htmlpro-domain-app.service";
import { HtmlproDomainStoreService } from "@lib/htmlpro-workspace";

@singleton()
/**
 * The list of steps for the program build html.
 */
export class BuildHtmlStepService {
  constructor(
    private readonly simpleMessage: SimpleMessageAppService,
    private readonly newline: NewlineAppService,
    private readonly goToProjectRoot: GoToProjectRootAppService,
    private readonly pathUtils: PathUtilsService,
    private readonly loadHtmlproDomain: LoadHtmlproDomainAppService,
    private readonly buildHtml: BuildHtmlAppService,
    private readonly htmlproDomainStore: HtmlproDomainStoreService
  ) {
  }

  runSteps(
    programModel: EmptyHtmlproProgramModel,
    commandModel: BuildHtmlHtmlproCommandModel
  ): void {
    this.simpleMessage.writeInfo("Build html", HTMLPRO_LOGO);
    if (!this.goToProjectRoot.run()) return;
    const { inputPath, outputPath } = commandModel;
    if (!this.pathUtils.existPath(inputPath)) return;
    if (!this.loadHtmlproDomain.run()) return;
    console.log(this.htmlproDomainStore.getDomain());
    if (!this.buildHtml.run(inputPath, outputPath)) return;
    this.newline.writeNewline();
    this.simpleMessage.writeSuccess(
      "Html file builded successfully!"
    );
  }
}
