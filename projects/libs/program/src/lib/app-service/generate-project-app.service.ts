import { singleton } from "tsyringe";
import { DomainConfigAppService } from "@lib/domain";
import { ProjectAppService } from "@lib/project";
import { SimpleMessageAppService } from "@lib/logger";
import { CreateFolderService } from "../infra/create-folder.service";
import { GoIntoService } from "../infra/go-into.service";
import { RunCommandService } from "../infra/run-command.service";
import {
  FolderDoesNotExistService
} from "../infra/folder-does-not-exist.service";
import {
  CreateEmptyFileService
} from "../infra/create-empty-file.service";

@singleton()
/**
 * The app service is responsible for generate project.
 */
export class GenerateProjectAppService {
  constructor(
    private readonly folderDoesNotExist: FolderDoesNotExistService,
    private readonly domainConfigApp: DomainConfigAppService,
    private readonly projectApp: ProjectAppService,
    private readonly simpleMessage: SimpleMessageAppService,
    private readonly createFolder: CreateFolderService,
    private readonly goInto: GoIntoService,
    private readonly runCommand: RunCommandService,
    private readonly createEmptyFile: CreateEmptyFileService
  ) {
  }

  generateProject(name: string, type: string): boolean {
    // Prepare data to process
    const projectType = this.projectApp.getProjectType(type);
    const projectPath = this.projectApp.getProjectPath(
      name, projectType
    );
    // Load the configuration file
    this.simpleMessage.writePlain("Load repox configuration", 0);
    this.domainConfigApp.loadDomainConfig();
    // Check project exist
    this.simpleMessage.writePlain("Check project exist", 0);
    if (this.domainConfigApp.checkProjectExist(name)) {
      this.simpleMessage.writeError(
        `The ${name} project already exist`, 0, false, true
      );
      return false;
    }
    if (!this.folderDoesNotExist.notExist(projectPath)) return false;
    // Add project to the configuration file
    this.simpleMessage.writePlain(
      "Add new project to repox configuration file", 0
    );
    this.domainConfigApp.addProject(name, projectType, projectPath);
    // Save the configuration file
    this.simpleMessage.writePlain("Save repox configuration", 0);
    this.domainConfigApp.saveDomainConfig();
    // Create project on the system
    this.createFolder.create(projectPath);
    this.goInto.goInto(projectPath);
    this.runCommand.exec("npm init -y");
    this.createFolder.create("src");
    this.createEmptyFile.create("src/index.ts");
    this.createFolder.create("src/lib");
    this.createEmptyFile.create("src/lib/.gitkeep");
    return true;
  }
}
