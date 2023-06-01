import { singleton } from "tsyringe";
import { GenerateWorkspaceCommandArgModel } from "@lib/param-domain";
import { SimpleMessageAppService } from "@lib/logger";
import {
  SystemVerificationAppService
} from "../app-service/system-verification-app.service";
import {
  GenerateWorkspaceAppService
} from "../app-service/generate-workspace-app.service";

@singleton()
/**
 * The list of steps for the generate workspace program.
 */
export class GenerateWorkspaceStepService {
  constructor(
    private readonly loggerMessageApp: SimpleMessageAppService,
    private readonly systemVerification: SystemVerificationAppService,
    private readonly generateWorkspace: GenerateWorkspaceAppService
  ) {
  }

  runSteps(commandModel: GenerateWorkspaceCommandArgModel): void {
    this.loggerMessageApp.writeInfo(
      "Workspace generation", 1, true, true
    );
    if (!this.systemVerification.checkSystem()) return;
    const { name } = commandModel;
    if (!this.generateWorkspace.generateWorkspace(name)) return;
  }
}
// todo: refactor