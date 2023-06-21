import { singleton } from "tsyringe";
import {
  SystemVerificationAppService
} from "../app-service/system-verification-app.service";
import { SimpleMessageAppService } from "@lib/logger";
import { BuildProjectCommandArgDomainModel } from "@lib/param-domain";
import {
  LinkProjectAppService
} from "../app-service/link-project-app.service";
import {
  WorkspaceCheckAppService
} from "../app-service/workspace-check-app.service";
import {
  LoadConfigFileAppService
} from "../app-service/load-config-file-app.service";

@singleton()
/**
 * The list of steps for the link project program.
 */
export class LinkProjectStepService {
  constructor(
    private readonly systemVerification: SystemVerificationAppService,
    private readonly loggerMessageApp: SimpleMessageAppService,
    private readonly linkProjectApp: LinkProjectAppService,
    private readonly folderIsWorkspace: WorkspaceCheckAppService,
    private readonly loadConfigFileApp: LoadConfigFileAppService
  ) {
  }

  runSteps(model: BuildProjectCommandArgDomainModel): void {
    this.loggerMessageApp.writeInfo(
      "Link project", 1, true, true
    );
    if (!this.systemVerification.checkSystem()) return;
    if (!this.folderIsWorkspace.checkWorkspace()) return;
    if (!this.loadConfigFileApp.loadConfig()) return;
    const { projectName } = model;
    if (!this.linkProjectApp.linkProject(projectName)) return;
  }
}
// todo: refactor
