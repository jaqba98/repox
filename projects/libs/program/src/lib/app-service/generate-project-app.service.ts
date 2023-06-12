import { singleton } from "tsyringe";
import { FileExistService } from "../infra/file-exist.service";
import { ProjectAppService } from "@lib/project";
import {
  FolderNotExistService
} from "../infra/folder-not-exist.service";
import { CreateFolderService } from "../infra/create-folder.service";
import { GoIntoService } from "../infra/go-into.service";
import { RunCommandService } from "../infra/run-command.service";
import {
  CreateEmptyFileService
} from "../infra/create-empty-file.service";
import { WriteFileService } from "@lib/utils";
import {
  BuildDefaultDomainAppService, DomainConfigFileEnum,
  DomainConfigStoreService
} from "@lib/domain";
import { SimpleMessageAppService } from "@lib/logger";

@singleton()
/**
 * The app service is responsible for generate project.
 */
export class GenerateProjectAppService {
  constructor(
    private readonly fileExist: FileExistService,
    private readonly domainConfigStore: DomainConfigStoreService,
    private readonly simpleMessage: SimpleMessageAppService,
    private readonly folderNotExist: FolderNotExistService,
    private readonly projectApp: ProjectAppService,
    private readonly createFolder: CreateFolderService,
    private readonly goInto: GoIntoService,
    private readonly runCommand: RunCommandService,
    private readonly writeFile: WriteFileService,
    private readonly createEmptyFile: CreateEmptyFileService,
    private readonly buildDefaultDomain: BuildDefaultDomainAppService
  ) {
  }

  generateProject(projectName: string, type: string): boolean {
    // Prepare data to process
    const projectType = this.projectApp.getProjectType(type);
    const projectPath = this.projectApp.getProjectPath(
      projectName, projectType
    );
    const projectAlias = this.projectApp.getProjectAlias(
      projectName, projectType
    );
    // Check whether the current folder is the workspace
    if (!this.fileExist.exist(DomainConfigFileEnum.repoxJson)) {
      return false;
    }
    if (!this.fileExist.exist(DomainConfigFileEnum.tsconfigJson)) {
      return false;
    }
    // Load the configuration files
    this.domainConfigStore.loadConfig();
    // Check whether the project exist
    if (this.domainConfigStore.existProject(projectName)) {
      this.simpleMessage.writeError(
        `The ${projectName} project already exist!`, 0, false, true
      );
      return false;
    }
    if (this.domainConfigStore.existAlias(projectAlias)) {
      this.simpleMessage.writeError(
        `The ${projectAlias} alias already exist!`, 0, false, true
      );
      return false;
    }
    if (!this.folderNotExist.exist(projectPath)) return false;
    // Add new project to the configuration file
    this.domainConfigStore.addProject(
      projectName, projectType, projectPath
    );
    this.domainConfigStore.addAlias(projectAlias, projectPath);
    // Save the configuration files
    this.domainConfigStore.saveConfig();
    // Create project on the system
    this.createFolder.create(projectPath);
    this.goInto.goInto(projectPath);
    this.runCommand.exec("npm init -y");
    this.runCommand.exec("tsc --init");
    this.writeFile.writeJson(
      DomainConfigFileEnum.tsconfigJson,
      this.buildDefaultDomain.buildTsconfigProject()
    );
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
