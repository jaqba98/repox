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
import { GoToProjectRootAppService } from "@lib/program-step";
import {
  LoadWsDtoAppService
} from "../app-service/load-ws-dto-app.service";
import {
  LoadWsDomainAppService
} from "../app-service/load-ws-domain-app.service";
import {
  ProjectNotExistAppService
} from "../app-service/project-not-exist-app.service";
import {
  AddProjectToDomainAppService
} from "../app-service/add-project-to-domain-app.service";
import {
  SaveWsDomainAppService
} from "../app-service/save-ws-domain-app.service";
import {
  SaveWsDtoAppService
} from "../app-service/save-ws-dto-app.service";
import {
  CreateProjectFilesAppService
} from "../app-service/create-project-files-app.service";

@singleton()
/**
 * The list of steps for the program generate project.
 */
export class GenerateProjectStepService {
  constructor(
    private readonly simpleMessage: SimpleMessageAppService,
    private readonly newline: NewlineAppService,
    private readonly allProgramInstalled: AllProgramInstalledService,
    private readonly goToProjectRoot: GoToProjectRootAppService,
    private readonly loadWsDto: LoadWsDtoAppService,
    private readonly loadWsDomain: LoadWsDomainAppService,
    private readonly projectNotExist: ProjectNotExistAppService,
    private readonly addProjectToDomain: AddProjectToDomainAppService,
    private readonly saveWsDomain: SaveWsDomainAppService,
    private readonly saveWsDto: SaveWsDtoAppService,
    private readonly createProjectFiles: CreateProjectFilesAppService
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
    if (!this.loadWsDto.run()) return;
    if (!this.loadWsDomain.run()) return;
    const {
      projectName, projectType, projectPath, projectScheme
    } = commandModel;
    if (!this.projectNotExist.run(projectName)) return;
    this.addProjectToDomain.run(
      projectName, projectType, projectPath, projectScheme
    );
    if (!this.saveWsDomain.run()) return;
    if (!this.saveWsDto.run()) return;
    if (!this.createProjectFiles.run(projectName)) return;
    this.newline.writeNewline();
    this.simpleMessage.writeSuccess("Project generated correctly");
  }
}
