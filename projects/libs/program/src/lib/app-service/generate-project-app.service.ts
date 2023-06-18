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
  BuildDefaultDomainAppService,
  DomainConfigFileEnum,
  DomainConfigStoreService
} from "@lib/domain";
import { SimpleMessageAppService } from "@lib/logger";
import {
  GenerateProjectCommandArgDomainModel
} from "@lib/param-domain";

@singleton()
/**
 * The app service is responsible for generate project.
 */
export class GenerateProjectAppService {
  constructor(
    private readonly fileExist: FileExistService,
    private readonly domainConfigStore: DomainConfigStoreService,
    private readonly simple: SimpleMessageAppService,
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

  generateProject(
    model: GenerateProjectCommandArgDomainModel
  ): boolean {
    // Prepare data to process
    const name = model.name;
    const basePath = model.path;
    const type = this.projectApp.getProjectType(model.type);
    const path = this.projectApp.getProjectPath(name, type, basePath);
    const alias = this.projectApp.getProjectAlias(name, type);
    // Add new project to the configuration file
    this.domainConfigStore.addProject(
      name, type, path
    );
    this.domainConfigStore.addAlias(alias, path);
    // Save the configuration files
    this.domainConfigStore.saveConfig();
    // Create project on the system
    this.createFolder.create(path);
    this.goInto.goInto(path);
    this.runCommand.exec("npm init -y");
    this.runCommand.exec("tsc --init");
    const rootTsconfigPath: string = path
      .split("/")
      .map(() => "..")
      .join("/")
      .concat("/tsconfig.json");
    this.writeFile.writeJson(
      DomainConfigFileEnum.tsconfigJson,
      this.buildDefaultDomain.buildTsconfigProject(rootTsconfigPath)
    );
    this.createFolder.create("src");
    this.createEmptyFile.create("src/index.ts");
    this.createFolder.create("src/lib");
    this.createEmptyFile.create("src/lib/.gitkeep");
    // Success message
    this.simple.writeNewline();
    this.simple.writeSuccess(
      "Project created correctly!", 1, false, true
    );
    return true;
  }
}
