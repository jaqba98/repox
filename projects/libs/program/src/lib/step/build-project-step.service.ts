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
  FolderIsWorkspaceAppService
} from "../app-service/folder-is-workspace-app.service";

@singleton()
/**
 * The list of steps for the build project program.
 */
export class BuildProjectStepService {
  constructor(
    private readonly systemVerification: SystemVerificationAppService,
    private readonly loggerMessageApp: SimpleMessageAppService,
    private readonly buildProjectApp: BuildProjectAppService,
    private readonly folderIsWorkspace: FolderIsWorkspaceAppService
  ) {
  }

  runSteps(model: BuildProjectCommandArgDomainModel): void {
    this.loggerMessageApp.writeInfo(
      "Build project", 1, true, true
    );
    if (!this.systemVerification.checkSystem()) return;
    if (!this.folderIsWorkspace.checkFolder()) return;
    const { projectName } = model;
    if (!this.buildProjectApp.buildProject(projectName)) return;
  }
}
