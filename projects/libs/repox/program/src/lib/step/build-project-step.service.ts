import { singleton } from "tsyringe";
import {
  BuildProjectAppService
} from "../app-service/build-project-app.service";
import { SimpleMessageAppService } from "@lib/logger";
import { BuildProjectCommandArgDomainModel } from "@lib/param-domain";
import {
  CheckWorkspaceAppService
} from "../app-service/check-workspace-app.service";
import {
  LoadConfigFileAppService
} from "../app-service/load-config-file-app.service";
import { REPOX_LOGO } from "@lib/const";

@singleton()
/**
 * The list of steps for the build project program.
 */
export class BuildProjectStepService {
  constructor(
    private readonly loggerMessageApp: SimpleMessageAppService,
    private readonly buildProjectApp: BuildProjectAppService,
    private readonly folderIsWorkspace: CheckWorkspaceAppService,
    private readonly loadConfigFileApp: LoadConfigFileAppService
  ) {
  }

  runSteps(model: BuildProjectCommandArgDomainModel): void {
    this.loggerMessageApp.writeInfo(
      "Build project", REPOX_LOGO
    );
    if (!this.folderIsWorkspace.run()) return;
    if (!this.loadConfigFileApp.loadConfig()) return;
    const { projectName } = model;
    if (!this.buildProjectApp.buildProject(projectName)) return;
  }
}
// todo: refactor
