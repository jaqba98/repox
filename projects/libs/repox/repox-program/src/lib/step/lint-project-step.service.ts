import { singleton } from "tsyringe";
import {
  NewlineAppService,
  SimpleMessageAppService
} from "@lib/logger";
import {
  EmptyRepoxCommandModel,
  type EmptyRepoxProgramModel
} from "@lib/repox-domain";
import { REPOX_LOGO } from "@lib/repox-const";

@singleton()
/**
 * The list of steps for the program publish npm.
 */
export class LintProjectStepService {
  constructor (
    private readonly simpleMessage: SimpleMessageAppService,
    private readonly newline: NewlineAppService,
    // private readonly allProgramInstalled: AllProgramInstalledService,
    // private readonly goToProjectRoot: GoToProjectRootAppService,
    // private readonly loadWsDto: LoadWsDtoAppService,
    // private readonly loadWsDomain: LoadWsDomainAppService,
    // private readonly projectExist: ProjectExistAppService,
    // private readonly wsDomainStore: WsDomainStoreService,
    // private readonly folderExist: FolderExistAppService,
    // private readonly changePath: ChangePathAppService,
    // private readonly npmPublish: NpmPublishAppService
  ) {
  }

  runSteps (
    programModel: EmptyRepoxProgramModel,
    commandModel: EmptyRepoxCommandModel
  ): void {
    this.simpleMessage.writeInfo("Lint project", REPOX_LOGO);
    this.newline.writeNewline();
    // if (!this.allProgramInstalled.run()) return;
    // if (!this.goToProjectRoot.run()) return;
    // if (!this.loadWsDto.run()) return;
    // if (!this.loadWsDomain.run()) return;
    // const { projectName } = commandModel;
    // if (!this.projectExist.run(projectName)) return;
    // const project = this.wsDomainStore.getProject(projectName);
    // const output = project?.build.output ?? EMPTY_STRING;
    // if (!this.folderExist.run(output)) return;
    // if (!this.changePath.run(output)) return;
    // if (!this.npmPublish.run()) return;
    this.newline.writeNewline();
    this.simpleMessage.writeSuccess(
      "Project linted successfully!"
    );
  }
}
