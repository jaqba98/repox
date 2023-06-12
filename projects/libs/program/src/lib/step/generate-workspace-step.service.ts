import { singleton } from "tsyringe";
import {
  SystemVerificationAppService
} from "../app-service/system-verification-app.service";
import {
  GenerateWorkspaceAppService
} from "../app-service/generate-workspace-app.service";
import { SimpleMessageAppService } from "@lib/logger";
import {
  GenerateWorkspaceCommandArgDomainModel
} from "@lib/param-domain";

@singleton()
/**
 * The list of steps for the generate workspace program.
 */
export class GenerateWorkspaceStepService {
  constructor(
    private readonly simpleMessage: SimpleMessageAppService,
    private readonly systemVerification: SystemVerificationAppService,
    private readonly generate: GenerateWorkspaceAppService
  ) {
  }

  runSteps(model: GenerateWorkspaceCommandArgDomainModel): void {
    // Display the command header
    this.simpleMessage.writeInfo(
      "Workspace generation", 1, true, true
    );
    // Check the system correctness
    if (!this.systemVerification.checkSystem()) return;
    // Generate workspace
    if (!this.generate.generateWorkspace(model.workspaceName)) return;
  }
}
