import { singleton } from "tsyringe";
import {
  NewlineAppService,
  SimpleMessageAppService
} from "@lib/logger";
import {
  AllProgramInstalledService
} from "../compose/all-program-installed.service";
import {
  GoToProjectRootAppService
} from "../app-service/go-to-project-root-app.service";
import {
  LoadWsDtoAppService
} from "../app-service/load-ws-dto-app.service";
import {
  LoadWsDomainAppService
} from "../app-service/load-ws-domain-app.service";
import {
  EmptyRepoxProgramModel,
  PublishNpmRepoxCommandModel
} from "@lib/repox-domain";
import { REPOX_LOGO } from "@lib/repox-const";
import {
  ProjectExistAppService
} from "../app-service/project-exist-app.service";

@singleton()
/**
 * The list of steps for the program publish npm.
 */
export class PublishNpmStepService {
  constructor(
    private readonly simpleMessage: SimpleMessageAppService,
    private readonly newline: NewlineAppService,
    private readonly allProgramInstalled: AllProgramInstalledService,
    private readonly goToProjectRoot: GoToProjectRootAppService,
    private readonly loadWsDto: LoadWsDtoAppService,
    private readonly loadWsDomain: LoadWsDomainAppService,
    private readonly projectExist: ProjectExistAppService
  ) {
  }

  runSteps(
    programModel: EmptyRepoxProgramModel,
    commandModel: PublishNpmRepoxCommandModel
  ): void {
    this.simpleMessage.writeInfo("Publish npm", REPOX_LOGO);
    this.newline.writeNewline();
    if (!this.allProgramInstalled.run()) return;
    if (!this.goToProjectRoot.run()) return;
    if (!this.loadWsDto.run()) return;
    if (!this.loadWsDomain.run()) return;
    const { projectName } = commandModel;
    if (!this.projectExist.run(projectName)) return;
    // todo: Add step to publish npm
    console.log(projectName);
  }
}
