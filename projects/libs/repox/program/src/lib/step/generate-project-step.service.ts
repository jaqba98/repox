import { singleton } from "tsyringe";
import {
  GoToProjectRootAppService
} from "../app-service/go-to-project-root-app.service";
import { SimpleMessageAppService } from "@lib/logger";
import {
  ProjectAppService,
  ProjectSchemeEnum,
  ProjectTypeEnum
} from "@lib/project";
import {
  SystemVerificationAppService
} from "../app-service/system-verification-app.service";
import {
  GenerateProjectAppService
} from "../app-service/generate-project-app.service";
import {
  WorkspaceCheckAppService
} from "../app-service/workspace-check-app.service";
import {
  LoadConfigFileAppService
} from "../app-service/load-config-file-app.service";
import {
  ProjectNotExistAppService
} from "../app-service/project-not-exist-app.service";

@singleton()
/**
 * The list of steps for the generate project program.
 */
export class GenerateProjectStepService {
  constructor(
    private readonly simple: SimpleMessageAppService,
    private readonly goToProjectRoot: GoToProjectRootAppService,
    private readonly projectApp: ProjectAppService,
    private readonly systemVerification: SystemVerificationAppService,
    private readonly workspaceCheck: WorkspaceCheckAppService,
    private readonly generateProjectApp: GenerateProjectAppService,
    private readonly loadConfigFileApp: LoadConfigFileAppService,
    private readonly projectNotExist: ProjectNotExistAppService
  ) {
  }

  runSteps(
    model: {
      projectName: string,
      projectType: ProjectTypeEnum,
      projectPath: string,
      projectAlias: string,
      projectScheme: ProjectSchemeEnum
    }
  ): void {
    // Display generate project header
    this.simple.writeInfo("Project generation", 1, true, true);
    // Go to the root of the project
    if (!this.goToProjectRoot.goToRoot()) return;
    // System verification
    if (!this.systemVerification.checkSystem()) return;
    // Check workspace
    if (!this.workspaceCheck.checkWorkspace()) return;
    // Loading configuration
    if (!this.loadConfigFileApp.loadConfig()) return;
    // Check that the project does not exist
    if (!this.projectNotExist.check(model.projectName, model.projectType, model.projectPath)) return;
    // Generate a project
    if (!this.generateProjectApp.generate(
      model.projectName, model.projectType, model.projectPath, model.projectAlias, model.projectScheme
    )) {
      return;
    }
    // Display a success message
    this.simple.writeNewline();
    this.simple.writeSuccess("Project created", 1, false, true);
  }
}
// todo: refactor
