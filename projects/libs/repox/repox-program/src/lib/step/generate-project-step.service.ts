import { singleton } from "tsyringe";
import {
  NewlineAppService,
  SimpleMessageAppService
} from "@lib/logger";
import { REPOX_LOGO } from "@lib/repox-const";
import {
  GenerateProjectRepoxCommandModel
} from "@lib/repox-domain";
import {
  SystemVerificationAppService
} from "../app-service/system-verification-app.service";
import {
  GoToRootProjectAppService
} from "../app-service/go-to-root-project-app.service";
import {
  CheckWorkspaceAppService
} from "../app-service/check-workspace-app.service";
import {
  LoadConfigFileAppService
} from "../app-service/load-config-file-app.service";

@singleton()
/**
 * The list of steps for the generate project program.
 */
export class GenerateProjectStepService {
  constructor(
    private readonly simpleMessage: SimpleMessageAppService,
    private readonly systemVerification: SystemVerificationAppService,
    private readonly newline: NewlineAppService,
    private readonly goToRootProject: GoToRootProjectAppService,
    private readonly checkWorkspace: CheckWorkspaceAppService,
    private readonly loadConfigFile: LoadConfigFileAppService
    // private readonly projectApp: ProjectAppService,
    // private readonly systemVerification: SystemVerificationAppService,
    // private readonly workspaceCheck: WorkspaceCheckAppService,
    // private readonly generateProjectApp: GenerateProjectAppService,
    // private readonly loadConfigFileApp: LoadConfigFileAppService,
    // private readonly projectNotExist: ProjectNotExistAppService
  ) {
  }

  runSteps(commandModel: GenerateProjectRepoxCommandModel): void {
    this.simpleMessage.writeInfo("Project generation", REPOX_LOGO);
    this.newline.writeNewline();
    if (!this.systemVerification.run()) return;
    if (!this.goToRootProject.run()) return;
    if (!this.checkWorkspace.run()) return;
    if (!this.loadConfigFile.run()) return;
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
