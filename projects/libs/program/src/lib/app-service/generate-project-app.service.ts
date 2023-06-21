// Refactored file
import { singleton } from "tsyringe";
import {
  BuildDefaultDomainAppService,
  DomainConfigStoreService,
  TsconfigProjectDomainModel
} from "@lib/domain";
import { SimpleMessageAppService } from "@lib/logger";
import {
  CreateFolderService
} from "../infrastructure/create-folder.service";
import {
  ChangePathService
} from "../infrastructure/change-path.service";
import {
  RunCommandService
} from "../infrastructure/run-command.service";
import { PathUtilsService, WriteFileService } from "@lib/utils";
import {
  CreateEmptyFileService
} from "../infrastructure/create-empty-file.service";
import { ProjectSchemeEnum, ProjectTypeEnum } from "@lib/project";
import {
  GIT_KEEP,
  INDEX_FILE,
  LIB,
  SRC,
  TSCONFIG_FILE
} from "@lib/const";

@singleton()
/**
 * The app service is responsible for generate project.
 */
export class GenerateProjectAppService {
  constructor(
    private readonly simple: SimpleMessageAppService,
    private readonly domainConfigStore: DomainConfigStoreService,
    private readonly pathUtils: PathUtilsService,
    private readonly createFolder: CreateFolderService,
    private readonly changePath: ChangePathService,
    private readonly runCommand: RunCommandService,
    private readonly writeFile: WriteFileService,
    private readonly buildDefaultDomain: BuildDefaultDomainAppService,
    private readonly createEmptyFile: CreateEmptyFileService
  ) {
  }

  generate(
    name: string,
    type: ProjectTypeEnum,
    path: string,
    alias: string,
    scheme: ProjectSchemeEnum
  ): boolean {
    // Display generate project config header
    this.simple.writePlain("Generate project configuration");
    // Add a new project to the repox.json file
    this.domainConfigStore.addProject(name, type, path, scheme);
    switch (scheme) {
      case ProjectSchemeEnum.typescript:
        // Add a new alias to the tsconfig.json file
        const aliasPath = this.pathUtils.createPath(
          [path, SRC, INDEX_FILE]
        );
        this.domainConfigStore.addAlias(alias, aliasPath);
        // Save the domain config on the disc
        this.domainConfigStore.saveConfig();
        return this.generateTypescriptFiles(path);
      case ProjectSchemeEnum.staticPage:
        // Save the domain config on the disc
        this.domainConfigStore.saveConfig();
        return this.generateStaticPageFiles(path);
      default:
        throw new Error("Not supported scheme!");
    }
  }

  private generateTypescriptFiles(path: string): boolean {
    // Display generate project files header
    this.simple.writePlain("Generate typescript project files");
    // Create the project file and go inside
    this.createFolder.create(path);
    this.changePath.change(path);
    // Init the project
    this.runCommand.runNpm("npm init -y");
    this.runCommand.runNpm("tsc --init");
    this.writeFile.writeJson<TsconfigProjectDomainModel>(
      TSCONFIG_FILE,
      this.buildDefaultDomain.buildTsconfigProject(path)
    );
    // Create all sub folders and files
    this.createFolder.create(SRC);
    this.createEmptyFile.create(`${SRC}/${INDEX_FILE}`);
    this.createFolder.create(`${SRC}/${LIB}`);
    this.createEmptyFile.create(`${SRC}/${LIB}/${GIT_KEEP}`);
    return true;
  }

  private generateStaticPageFiles(path: string): boolean {
    // Display generate project files header
    this.simple.writePlain("Generate static page project files");
    // Create the project file and go inside
    this.createFolder.create(path);
    this.changePath.change(path);
    return true;
  }
}
// todo: refactor
