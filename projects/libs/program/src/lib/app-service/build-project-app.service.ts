import { singleton } from "tsyringe";
import {
  FolderNotExistService
} from "../infra/folder-not-exist.service";
import { DomainConfigAppService } from "@lib/domain";
import { ProjectAppService } from "@lib/project";
import { SimpleMessageAppService } from "@lib/logger";
import { RunCommandService } from "../infra/run-command.service";
import { join } from "path";

@singleton()
/**
 * The app service is responsible for build project
 * to the dist folder.
 */
export class BuildProjectAppService {
  constructor(
    private readonly folderDoesNotExist: FolderNotExistService,
    private readonly domainConfigApp: DomainConfigAppService,
    private readonly projectApp: ProjectAppService,
    private readonly runCommand: RunCommandService,
    private readonly simpleMessage: SimpleMessageAppService
  ) {
  }

  buildProject(name: string): boolean {
    // Load the configuration file
    this.simpleMessage.writePlain("Load repox configuration", 0);
    this.domainConfigApp.loadDomainConfig();
    // Get project data
    this.simpleMessage.writePlain(
      "Get project from configuration", 0
    );
    const project = this.domainConfigApp.getProject(name);
    if (!project) {
      this.simpleMessage.writeError(
        "The given project not exist!", 0, false, true
      );
      return false;
    }
    // Compile the project
    const outDir = `--outDir ./dist/${project.name}`;
    const projectDir = `--project ${project.path}`;
    this.runCommand.exec(`tsc ${outDir} ${projectDir}`);
    this.simpleMessage.writeNewline();
    this.simpleMessage.writeSuccess(
      "Project created correctly!", 1, false, true
    );
    return true;
  }
}
// todo: refactor