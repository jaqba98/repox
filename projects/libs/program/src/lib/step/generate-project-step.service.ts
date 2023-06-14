import { singleton } from "tsyringe";
import {
  SystemVerificationAppService
} from "../app-service/system-verification-app.service";
import {
  GenerateProjectAppService
} from "../app-service/generate-project-app.service";
import { SimpleMessageAppService } from "@lib/logger";
import {
  GenerateProjectCommandArgDomainModel
} from "@lib/param-domain";
import {
  FolderIsWorkspaceAppService
} from "../app-service/folder-is-workspace-app.service";

@singleton()
/**
 * The list of steps for the generate project program.
 */
export class GenerateProjectStepService {
  constructor(
    private readonly simpleMessage: SimpleMessageAppService,
    private readonly systemVerification: SystemVerificationAppService,
    private readonly generateProjectApp: GenerateProjectAppService,
    private readonly folderIsWorkspace: FolderIsWorkspaceAppService
  ) {
  }

  runSteps(model: GenerateProjectCommandArgDomainModel): void {
    // Display the command header
    this.simpleMessage.writeInfo(
      "Project generation", 1, true, true
    );
    // Check the system correctness
    if (!this.systemVerification.checkSystem()) return;
    if (!this.folderIsWorkspace.checkFolder()) return;
    // Generate project
    const { projectName, projectType } = model;
    if (!this.generateProjectApp.generateProject(
      projectName, projectType
    )) {
      return;
    }
  }
}
