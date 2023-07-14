import { singleton } from "tsyringe";
import {
  BuildProjectAppService
} from "../app-service/build-project-app.service";
import { SimpleMessageAppService } from "@lib/logger";
// import { BuildProjectCommandArgDomainModel } from "@lib/param-domain";
import {
  CheckWorkspaceAppService
} from "../app-service/check-workspace-app.service";
import {
  LoadWsConfigAppService
} from "../app-service/load-ws-config-app.service";
import { REPOX_LOGO } from "@lib/repox-const";

@singleton()
/**
 * The list of steps for the build project program.
 */
export class BuildProjectStepService {
  constructor(
    private readonly loggerMessageApp: SimpleMessageAppService,
    private readonly buildProjectApp: BuildProjectAppService,
    private readonly folderIsWorkspace: CheckWorkspaceAppService,
    private readonly loadConfigFileApp: LoadWsConfigAppService
  ) {
  }

  runSteps(model: any): void {
    this.loggerMessageApp.writeInfo(
      "Build project", REPOX_LOGO
    );
    if (!this.folderIsWorkspace.run()) return;
    if (!this.loadConfigFileApp.run()) return;
    const { projectName } = model;
    if (!this.buildProjectApp.buildProject(projectName)) return;
  }
}
// todo: refactor
