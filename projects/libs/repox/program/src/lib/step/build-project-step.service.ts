import { singleton } from "tsyringe";
import {
  SystemVerificationAppService
} from "../app-service/system-verification-app.service";
import {
  BuildProjectAppService
} from "../app-service/build-project-app.service";
import { SimpleMessageAppService } from "@lib/logger";
import { BuildProjectCommandArgDomainModel } from "@lib/param-domain";
import {
  WorkspaceCheckAppService
} from "../app-service/workspace-check-app.service";
import {
  LoadConfigFileAppService
} from "../app-service/load-config-file-app.service";

@singleton()
/**
 * The list of steps for the build project program.
 */
export class BuildProjectStepService {
  constructor(
    private readonly systemVerification: SystemVerificationAppService,
    private readonly loggerMessageApp: SimpleMessageAppService,
    private readonly buildProjectApp: BuildProjectAppService,
    private readonly folderIsWorkspace: WorkspaceCheckAppService,
    private readonly loadConfigFileApp: LoadConfigFileAppService
  ) {
  }

  runSteps(model: BuildProjectCommandArgDomainModel): void {
    this.loggerMessageApp.writeInfo(
      "Build project", 1, true, true
    );
    if (!this.systemVerification.checkSystem()) return;
    if (!this.folderIsWorkspace.checkWorkspace()) return;
    if (!this.loadConfigFileApp.loadConfig()) return;
    const { projectName } = model;
    if (!this.buildProjectApp.buildProject(projectName)) return;
  }
}
// todo: refactor
