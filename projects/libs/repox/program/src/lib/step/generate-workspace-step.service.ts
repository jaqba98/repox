import { singleton } from "tsyringe";
import {
  GenerateWorkspaceAppService
} from "../app-service/generate-workspace-app.service";
import { SimpleMessageAppService } from "@lib/logger";
import {
  GenerateWorkspaceCommandArgDomainModel
} from "@lib/param-domain";
import { REPOX_LOGO } from "@lib/const";

@singleton()
/**
 * The list of steps for the generate workspace program.
 */
export class GenerateWorkspaceStepService {
  constructor(
    private readonly simpleMessage: SimpleMessageAppService,
    private readonly generate: GenerateWorkspaceAppService
  ) {
  }

  runSteps(model: GenerateWorkspaceCommandArgDomainModel): void {
    // Display the command header
    this.simpleMessage.writeInfo(
      "Workspace generation", REPOX_LOGO
    );
    // Generate workspace
    if (!this.generate.generateWorkspace(model.workspaceName)) return;
  }
}
// todo: refactor
