import { singleton } from "tsyringe";
import { SimpleMessageAppService } from "@lib/logger";
import { BuildProjectCommandArgDomainModel } from "@lib/param-domain";
import {
  CheckWorkspaceAppService
} from "../app-service/check-workspace-app.service";
import {
  LoadConfigFileAppService
} from "../app-service/load-config-file-app.service";
import {
  UnlinkProjectAppService
} from "../app-service/unlink-project-app.service";
import { REPOX_LOGO } from "@lib/const";

@singleton()
/**
 * The list of steps for the unlink project program.
 */
export class UnlinkProjectStepService {
  constructor(
    private readonly loggerMessageApp: SimpleMessageAppService,
    private readonly unlinkProjectApp: UnlinkProjectAppService,
    private readonly folderIsWorkspace: CheckWorkspaceAppService,
    private readonly loadConfigFileApp: LoadConfigFileAppService
  ) {
  }

  runSteps(model: BuildProjectCommandArgDomainModel): void {
    this.loggerMessageApp.writeInfo(
      "Unlink project", REPOX_LOGO
    );
    if (!this.folderIsWorkspace.run()) return;
    if (!this.loadConfigFileApp.loadConfig()) return;
    const { projectName } = model;
    if (!this.unlinkProjectApp.unlinkProject(projectName)) return;
  }
}
// todo: refactor
