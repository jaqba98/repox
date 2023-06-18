import { singleton } from "tsyringe";
import { SimpleMessageAppService } from "@lib/logger";
import { ProjectAppService } from "@lib/project";
import {
  SystemVerificationAppService
} from "../app-service/system-verification-app.service";
import {
  GenerateProjectAppService
} from "../app-service/generate-project-app.service";
import {
  FolderIsWorkspaceAppService
} from "../app-service/folder-is-workspace-app.service";
import {
  LoadConfigFileAppService
} from "../app-service/load-config-file-app.service";
import {
  ProjectNotExistAppService
} from "../app-service/project-not-exist-app.service";
import {
  GenerateProjectCommandArgDomainModel
} from "@lib/param-domain";

@singleton()
/**
 * The list of steps for the generate project program.
 */
export class GenerateProjectStepService {
  constructor(
    private readonly simple: SimpleMessageAppService,
    private readonly projectApp: ProjectAppService,
    private readonly systemVerification: SystemVerificationAppService,
    private readonly generateProjectApp: GenerateProjectAppService,
    private readonly folderIsWorkspace: FolderIsWorkspaceAppService,
    private readonly loadConfigFileApp: LoadConfigFileAppService,
    private readonly projectNotExist: ProjectNotExistAppService
  ) {
  }

  runSteps(commandArgDm: GenerateProjectCommandArgDomainModel): void {
    // Prepare data to generate project
    const name = commandArgDm.name;
    const basePath = commandArgDm.path;
    const type = this.projectApp.getProjectType(commandArgDm.type);
    const path = this.projectApp.getProjectPath(name, type, basePath);
    const alias = this.projectApp.getProjectAlias(type, name);
    // Display generate project header
    this.simple.writeInfo("Project generation", 1, true, true);
    // System verification
    if (!this.systemVerification.checkSystem()) return;
    // Check whether folder is a workspace
    if (!this.folderIsWorkspace.checkFolder()) return;

    if (!this.loadConfigFileApp.loadConfig()) return
    if (!this.projectNotExist.check(name, type, path)) return;
    // Generate a project
    if (!this.generateProjectApp.generate(name, type, path, alias)) {
      return;
    }
    // Display a success message
    this.simple.writeNewline();
    this.simple.writeSuccess("Project created", 1, false, true);
  }
}
