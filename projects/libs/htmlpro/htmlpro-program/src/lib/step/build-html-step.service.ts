import { singleton } from "tsyringe";
import {
  NewlineAppService,
  SimpleMessageAppService
} from "@lib/logger";
import { HTML_PRO_LOGO } from "@lib/htmlpro-const";
import {
  BuildDefaultHtmlProProgramModel,
  EmptyHtmlProCommandModel
} from "@lib/htmlpro-domain";
import {
  AllProgramInstalledService,
  FileExistAppService,
  GoToProjectRootAppService
} from "@lib/program-step";
import {
  LoadHtmlProDomainAppService
} from "../app-service/load-html-pro-domain-app.service";
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
    private readonly allProgramInstalled: AllProgramInstalledService,
    private readonly goToProjectRoot: GoToProjectRootAppService,
    private readonly loadHtmlProDomain: LoadHtmlProDomainAppService,
    private readonly fileExist: FileExistAppService,
    private readonly buildHtml: BuildHtmlAppService
  ) {
  }

  runSteps(
    programModel: BuildDefaultHtmlProProgramModel,
    commandModel: EmptyHtmlProCommandModel
  ): void {
    this.simpleMessage.writeInfo("Build html", HTML_PRO_LOGO);
    this.newline.writeNewline();
    if (!this.allProgramInstalled.run()) return;
    if (!this.goToProjectRoot.run()) return;
    if (!this.loadHtmlProDomain.run()) return;
    const { inputPath, outputPath } = programModel;
    if (!this.fileExist.run(inputPath)) return;
    if (!this.buildHtml.run(inputPath, outputPath)) return;
    this.newline.writeNewline();
    this.simpleMessage.writeSuccess(
      "Html file built successfully!"
    );
  }
}
