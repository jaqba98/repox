import { singleton } from "tsyringe";
import {
  NewlineAppService,
  SimpleMessageAppService
} from "@lib/logger";
import { REPOX_LOGO } from "@lib/repox-const";
import {
  BuildProjectRepoxCommandModel,
  EmptyRepoxProgramModel
} from "@lib/repox-domain";
import { ProgramSystemEnum } from "../enum/program-system.enum";
import {
  ProgramInstalledAppService
} from "../app-service/program-installed-app.service";
import {
  GoToProjectRootAppService
} from "../app-service/go-to-project-root-app.service";
import {
  LoadWsDtoAppService
} from "../app-service/load-ws-dto-app.service";
import {
  LoadWsDomainAppService
} from "../app-service/load-ws-domain-app.service";

@singleton()
/**
 * The list of steps for the program build project.
 */
export class BuildProjectStepService {
  constructor(
    private readonly simpleMessage: SimpleMessageAppService,
    private readonly newline: NewlineAppService,
    private readonly programInstalled: ProgramInstalledAppService,
    private readonly goToProjectRoot: GoToProjectRootAppService,
    private readonly loadWsDto: LoadWsDtoAppService,
    private readonly loadWsDomain: LoadWsDomainAppService,
  ) {
  }

  runSteps(
    programModel: EmptyRepoxProgramModel,
    commandModel: BuildProjectRepoxCommandModel
  ): void {
    this.simpleMessage.writeInfo("Build project", REPOX_LOGO);
    this.newline.writeNewline();
    if (!this.programInstalled.run(ProgramSystemEnum.git)) return;
    if (!this.programInstalled.run(ProgramSystemEnum.node)) return;
    if (!this.programInstalled.run(ProgramSystemEnum.npm)) return;
    if (!this.goToProjectRoot.run()) return;
    if (!this.loadWsDto.run()) return;
    if (!this.loadWsDomain.run()) return;
    console.log("Hello");
  }
}
// todo: refactor
