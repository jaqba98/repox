import { singleton } from "tsyringe";
import { LoggerMessageAppService } from "@lib/logger";
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
    private readonly loggerMessageApp: LoggerMessageAppService,
    private readonly systemVerification: SystemVerificationAppService,
    private readonly generateWorkspace: GenerateWorkspaceAppService
  ) {
  }

  runSteps(name: string): boolean {
    this.loggerMessageApp.writeInfo("Running the command: Generate Workspace", true, true, 1);
    if (!this.systemVerification.run()) return false;
    this.loggerMessageApp.writePlain("", 0);
    return this.generateWorkspace.run(name);
  }
}
// todo: refactor