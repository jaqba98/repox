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
import { ProgramSystemEnum } from "../enum/program-system.enum";
import {
  ProgramInstalledAppService
} from "../app-service/program-installed-app.service";
import {
  GoToProjectRootAppService
} from "../app-service/go-to-project-root-app.service";
import {
  LoadWsConfigAppService
} from "../app-service/load-ws-config-app.service";
import {
  ProjectNotExistAppService
} from "../app-service/project-not-exist-app.service";
import {
  AddProjectToDomainAppService
} from "../app-service/add-project-to-domain-app.service";
import { WsDomainStoreService } from "@lib/repox-workspace";

@singleton()
/**
 * The list of steps for the program generate project.
 */
export class GenerateProjectStepService {
  constructor(
    private readonly simpleMessage: SimpleMessageAppService,
    private readonly newline: NewlineAppService,
    private readonly programInstalled: ProgramInstalledAppService,
    private readonly goToProjectRoot: GoToProjectRootAppService,
    private readonly loadWsConfig: LoadWsConfigAppService,
    private readonly projectNotExist: ProjectNotExistAppService,
    private readonly addProjectToDomain: AddProjectToDomainAppService,
    private readonly wsDomainStore: WsDomainStoreService
    // private readonly systemVerification: ProgramExistOnSystemAppService,
    // private readonly goToRootProject: GoToRootProjectAppService,
    // private readonly loadConfigFile: LoadConfigFileAppService
    // private readonly projectApp: ProjectAppService,
    // private readonly systemVerification: SystemVerificationAppService,
    // private readonly workspaceCheck: WorkspaceCheckAppService,
    // private readonly loadConfigFileApp: LoadConfigFileAppService,
  ) {
  }

  runSteps(
    programModel: EmptyRepoxProgramModel,
    commandModel: GenerateProjectRepoxCommandModel
  ): void {
    this.simpleMessage.writeInfo("Generate project", REPOX_LOGO);
    this.newline.writeNewline();
    if (!this.programInstalled.run(ProgramSystemEnum.git)) return;
    if (!this.programInstalled.run(ProgramSystemEnum.node)) return;
    if (!this.programInstalled.run(ProgramSystemEnum.npm)) return;
    if (!this.goToProjectRoot.run()) return;
    // todo: I am here
    console.log("Hello");
    // if (!this.loadWsConfig.run()) return;
    // const {
    //   projectName, projectType, projectPath, projectScheme
    // } = commandModel;
    // if (!this.projectNotExist.run(projectName)) return;
    // this.addProjectToDomain.run(
    //   projectName, projectType, projectPath, projectScheme
    // );
    // console.log(this.wsDomainStore);
    // // Display a success message
    // this.simple.writeNewline();
    // this.simple.writeSuccess("Project created", 1, false, true);
  }
}

// todo: refactor
