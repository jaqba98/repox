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

@singleton()
/**
 * The list of steps for the program generate project.
 */
export class GenerateProjectStepService {
  constructor(
    private readonly simpleMessage: SimpleMessageAppService,
    private readonly newline: NewlineAppService,
    private readonly programInstalled: ProgramInstalledAppService,
    private readonly goToProjectRoot: GoToProjectRootAppService
    // private readonly systemVerification: ProgramExistOnSystemAppService,
    // private readonly goToRootProject: GoToRootProjectAppService,
    // private readonly checkWorkspace: CheckWorkspaceAppService,
    // private readonly loadConfigFile: LoadConfigFileAppService
    // private readonly projectApp: ProjectAppService,
    // private readonly systemVerification: SystemVerificationAppService,
    // private readonly workspaceCheck: WorkspaceCheckAppService,
    // private readonly generateProjectApp: GenerateProjectAppService,
    // private readonly loadConfigFileApp: LoadConfigFileAppService,
    // private readonly projectNotExist: ProjectNotExistAppService
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
    // if (!this.checkWorkspace.run()) return;
    // if (!this.loadConfigFile.run()) return;
    // // Check that the project does not exist
    // if (!this.projectNotExist.check(
    //   model.projectName, model.projectType, model.projectPath
    // )) return;
    // // Generate a project
    // if (!this.generateProjectApp.generate(
    //   model.projectName, model.projectType, model.projectPath,
    //   model.projectAlias, model.projectScheme
    // )) {
    //   return;
    // }
    // // Display a success message
    // this.simple.writeNewline();
    // this.simple.writeSuccess("Project created", 1, false, true);
  }
}

// todo: refactor
