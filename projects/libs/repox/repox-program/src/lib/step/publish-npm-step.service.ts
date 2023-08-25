import { singleton } from "tsyringe";
import {
  NewlineAppService,
  SimpleMessageAppService
} from "@lib/logger";
import {
  AllProgramInstalledService,
  ChangePathAppService,
  GoToProjectRootAppService
} from "@lib/program-step";
import {
  LoadWsDtoAppService
} from "../app-service/load-ws-dto-app.service";
import {
  LoadWsDomainAppService
} from "../app-service/load-ws-domain-app.service";
import {
  type EmptyRepoxProgramModel,
  type PublishNpmRepoxCommandModel
} from "@lib/repox-domain";
import { REPOX_LOGO } from "@lib/repox-const";
import {
  ProjectExistAppService
} from "../app-service/project-exist-app.service";
import { WsDomainStoreService } from "@lib/repox-workspace";
import {
  FolderExistAppService
} from "../app-service/folder-exist-app.service";
import { EMPTY_STRING } from "@lib/const";
import {
  NpmPublishAppService
} from "../app-service/npm-publish-app.service";

@singleton()
/**
 * The list of steps for the program publish npm.
 */
export class PublishNpmStepService {
  constructor (
    private readonly simpleMessage: SimpleMessageAppService,
    private readonly newline: NewlineAppService,
    private readonly allProgramInstalled: AllProgramInstalledService,
    private readonly goToProjectRoot: GoToProjectRootAppService,
    private readonly loadWsDto: LoadWsDtoAppService,
    private readonly loadWsDomain: LoadWsDomainAppService,
    private readonly projectExist: ProjectExistAppService,
    private readonly wsDomainStore: WsDomainStoreService,
    private readonly folderExist: FolderExistAppService,
    private readonly changePath: ChangePathAppService,
    private readonly npmPublish: NpmPublishAppService
  ) {
  }

  runSteps (
    programModel: EmptyRepoxProgramModel,
    commandModel: PublishNpmRepoxCommandModel
  ): void {
    this.simpleMessage.writeInfo(`Publish npm`, REPOX_LOGO);
    this.newline.writeNewline();
    if (!this.allProgramInstalled.run()) return;
    if (!this.goToProjectRoot.run()) return;
    if (!this.loadWsDto.run()) return;
    if (!this.loadWsDomain.run()) return;
    const { projectName } = commandModel;
    if (!this.projectExist.run(projectName)) return;
    const project = this.wsDomainStore.getProject(projectName);
    const output = project?.build.output ?? EMPTY_STRING;
    if (!this.folderExist.run(output)) return;
    if (!this.changePath.run(output)) return;
    if (!this.npmPublish.run()) return;
    this.newline.writeNewline();
    this.simpleMessage.writeSuccess(
      `Npm published successfully!`
    );
  }
}
// todo: refactor the file
