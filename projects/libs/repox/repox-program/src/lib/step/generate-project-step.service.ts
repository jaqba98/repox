import { singleton } from "tsyringe";
import {
  EmptyRepoxProgramModel,
  GenerateProjectRepoxCommandModel
} from "@lib/repox-domain";
import {
  NewlineAppService,
  SimpleMessageAppService
} from "@lib/logger";
import { REPOX_LOGO } from "@lib/repox-const";
import {
  AllProgramInstalledService
} from "../compose/all-program-installed.service";
import {
  GoToProjectRootAppService
} from "../app-service/go-to-project-root-app.service";

@singleton()
/**
 * The list of steps for the program generate project.
 */
export class GenerateProjectStepService {
  constructor(
    private readonly simpleMessage: SimpleMessageAppService,
    private readonly newline: NewlineAppService,
    private readonly allProgramInstalled: AllProgramInstalledService,
    private readonly goToProjectRoot: GoToProjectRootAppService
    // private readonly loadWsDto: LoadWsDtoAppService,
    // private readonly loadWsDomain: LoadWsDomainAppService,
    // private readonly folderNotExist: FolderNotExistAppService,
    // private readonly projectNotExist: ProjectNotExistAppService,
    // private readonly addProjectToDomain: AddProjectToDomainAppService,
    // private readonly saveWsDomain: SaveWsDomainAppService,
    // private readonly saveWsDto: SaveWsDtoAppService,
    // private readonly createProjectStructure: CreateProjectStructureAppService
  ) {
  }

  runSteps(
    programModel: EmptyRepoxProgramModel,
    commandModel: GenerateProjectRepoxCommandModel
  ): void {
    this.simpleMessage.writeInfo("Generate project", REPOX_LOGO);
    this.newline.writeNewline();
    if (!this.allProgramInstalled.run()) return;
    if (!this.goToProjectRoot.run()) return;
    // todo: I am here
    // if (!this.loadWsDto.run()) return;
    // if (!this.loadWsDomain.run()) return;
    // const {
    //   projectName, projectType, projectPath, projectScheme
    // } = commandModel;
    // if (!this.folderNotExist.run(projectPath)) return;
    // if (!this.projectNotExist.run(projectName)) return;
    // this.addProjectToDomain.run(
    //   projectName, projectType, projectPath, projectScheme
    // );
    // if (!this.saveWsDomain.run()) return;
    // if (!this.saveWsDto.run()) return;
    // if (!this.createProjectStructure.run(projectName)) return;
    // this.newline.writeNewline();
    // this.simpleMessage.writeSuccess("Project generated correctly");
  }
}
