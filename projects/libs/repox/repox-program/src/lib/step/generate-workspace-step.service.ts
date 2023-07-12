import { singleton } from "tsyringe";
import {
  NewlineAppService,
  SimpleMessageAppService
} from "@lib/logger";
import { REPOX_LOGO } from "@lib/repox-const";
import {
  GenerateWorkspaceRepoxCommandDomainModel
} from "@lib/repox-domain";
import {
  GenerateWorkspaceAppService
} from "../app-service/generate-workspace-app.service";
import {
  SystemVerificationAppService
} from "../app-service/system-verification-app.service";

@singleton()
/**
 * The list of steps for the generate workspace program.
 */
export class GenerateWorkspaceStepService {
  constructor(
    private readonly simpleMessage: SimpleMessageAppService,
    private readonly systemVerification: SystemVerificationAppService,
    private readonly newline: NewlineAppService,
    private readonly generateWorkspace: GenerateWorkspaceAppService
  ) {
  }

  runSteps(commandModel: GenerateWorkspaceRepoxCommandDomainModel): void {
    this.simpleMessage.writeInfo("Workspace generation", REPOX_LOGO);
    this.newline.writeNewline();
    if (!this.systemVerification.run()) return;
    this.generateWorkspace.generateWorkspace(commandModel);
  }
}
// todo: refactor
