// Refactored file
import { singleton } from "tsyringe";
import {
  GoToProjectRootAppService
} from "../app-service/go-to-project-root-app.service";
import { SimpleMessageAppService } from "@lib/logger";
import { ProjectAppService, ProjectSchemeEnum } from "@lib/project";
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
import {
  GenerateProjectCommandArgDomainModel
} from "@lib/param-domain";

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

  runSteps(commandArgDm: GenerateProjectCommandArgDomainModel): void {
    // Display generate project header
    this.simple.writeInfo("Project generation", 1, true, true);
    // Go to the root of the project
    if (!this.goToProjectRoot.goToRoot()) return;
    // Prepare data for generation
    const name = commandArgDm.name;
    const basePath = commandArgDm.path;
    const scheme = <ProjectSchemeEnum>commandArgDm.scheme;
    const type = this.projectApp.getProjectType(commandArgDm.type);
    const path = this.projectApp.getProjectPath(name, type, basePath);
    const alias = this.projectApp.getProjectAlias(type, name);
    // System verification
    if (!this.systemVerification.checkSystem()) return;
    // Check workspace
    if (!this.workspaceCheck.checkWorkspace()) return;
    // Loading configuration
    if (!this.loadConfigFileApp.loadConfig()) return;
    // Check that the project does not exist
    if (!this.projectNotExist.check(name, type, path)) return;
    // Generate a project
    if (!this.generateProjectApp.generate(
      name, type, path, alias, scheme
    )) {
      return;
    }
    // Display a success message
    this.simple.writeNewline();
    this.simple.writeSuccess("Project created", 1, false, true);
  }
}
// todo: refactor
