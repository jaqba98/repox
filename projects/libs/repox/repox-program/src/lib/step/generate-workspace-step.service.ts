import { singleton } from "tsyringe";
import {
  GenerateWorkspaceAppService
} from "../app-service/generate-workspace-app.service";
import { SimpleMessageAppService } from "@lib/logger";
import { REPOX_LOGO } from "@lib/repox-const";
// import {
//   GenerateWorkspaceCommandArgDomainModel
// } from "@lib/param-domain";

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

  runSteps(model: any): void {
    // Display the command header
    this.simpleMessage.writeInfo(
      "Workspace generation", REPOX_LOGO
    );
    // Generate workspace
    if (!this.generate.generateWorkspace(model.workspaceName)) return;
  }
}
// todo: refactor
