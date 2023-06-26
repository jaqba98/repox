import { singleton } from "tsyringe";
import { SimpleMessageAppService } from "@lib/logger";
import { BuildProjectCommandArgDomainModel } from "@lib/param-domain";
import {
  LinkProjectAppService
} from "../app-service/link-project-app.service";
import {
  CheckWorkspaceAppService
} from "../app-service/check-workspace-app.service";
import {
  LoadConfigFileAppService
} from "../app-service/load-config-file-app.service";
import { REPOX_LOGO } from "@lib/workspace";

@singleton()
/**
 * The list of steps for the link project program.
 */
export class LinkProjectStepService {
  constructor(
    private readonly loggerMessageApp: SimpleMessageAppService,
    private readonly linkProjectApp: LinkProjectAppService,
    private readonly folderIsWorkspace: CheckWorkspaceAppService,
    private readonly loadConfigFileApp: LoadConfigFileAppService
  ) {
  }

  runSteps(model: BuildProjectCommandArgDomainModel): void {
    this.loggerMessageApp.writeInfo(
      "Link project", REPOX_LOGO
    );
    if (!this.folderIsWorkspace.run()) return;
    if (!this.loadConfigFileApp.loadConfig()) return;
    const { projectName } = model;
    if (!this.linkProjectApp.linkProject(projectName)) return;
  }
}
// todo: refactor
