import { singleton } from "tsyringe";
import {
  DomainConfigAppService,
  TsconfigDomainAppService
} from "@lib/domain";
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
import { join } from "path";

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
    private readonly createEmptyFile: CreateEmptyFileService,
    private readonly tsconfigDomainApp: TsconfigDomainAppService
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
    // Add alias to tsconfig.json
    this.simpleMessage.writePlain("Create the project alias", 0);
    this.tsconfigDomainApp.loadTsconfigConfig();
    const indexPath = join(projectPath, "index.ts");
    this.tsconfigDomainApp.addPath(name, projectType, indexPath);
    this.tsconfigDomainApp.saveTsconfigConfig();
    // Create project on the system
    this.createFolder.create(projectPath);
    this.goInto.goInto(projectPath);
    this.runCommand.exec("npm init -y");
    this.runCommand.exec("tsc --init");
    this.runCommand.exec("sed -i -r '/^[ \\t]*\\//d; '/^[[:space:]]*$/d'; s/\\/\\*(.*?)\\*\\///g' tsconfig.json")
    this.createFolder.create("src");
    this.createEmptyFile.create("src/index.ts");
    this.createFolder.create("src/lib");
    this.createEmptyFile.create("src/lib/.gitkeep");
    // Success message
    this.simpleMessage.writeNewline();
    this.simpleMessage.writeSuccess(
      "Project created correctly!", 1, false, true
    );
    return true;
  }
}
