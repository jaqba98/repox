import { singleton } from "tsyringe";
import {
  NewlineAppService,
  SimpleMessageAppService
} from "@lib/logger";
import type {
  EmptyRepoxCommandModel,
  EmptyRepoxProgramModel
} from "@lib/repox-domain";
import { REPOX_LOGO } from "@lib/repox-const";
import {
  AllProgramInstalledService,
  GoToProjectRootAppService
} from "@lib/program-step";
import {
  LoadWsDtoAppService
} from "../app-service/load-ws-dto-app.service";
import {
  LoadWsDomainAppService
} from "../app-service/load-ws-domain-app.service";
import {
  LintProjectsAppService
} from "../app-service/lint-projects-app.service";

@singleton()
/**
 * The list of steps for the program publish npm.
 */
export class LintProjectStepService {
  constructor (
    private readonly simpleMessage: SimpleMessageAppService,
    private readonly newline: NewlineAppService,
    private readonly allProgramInstalled: AllProgramInstalledService,
    private readonly goToProjectRoot: GoToProjectRootAppService,
    private readonly loadWsDto: LoadWsDtoAppService,
    private readonly loadWsDomain: LoadWsDomainAppService,
    private readonly lintProjectsApp: LintProjectsAppService
  ) {
  }

  runSteps (
    programModel: EmptyRepoxProgramModel,
    commandModel: EmptyRepoxCommandModel
  ): void {
    this.simpleMessage.writeInfo("Lint project", REPOX_LOGO);
    this.newline.writeNewline();
    if (!this.allProgramInstalled.run()) return;
    if (!this.goToProjectRoot.run()) return;
    if (!this.loadWsDto.run()) return;
    if (!this.loadWsDomain.run()) return;
    if (!this.lintProjectsApp.run()) return;
    this.newline.writeNewline();
    this.simpleMessage.writeSuccess(
      "Project linted successfully!"
    );
  }
}
