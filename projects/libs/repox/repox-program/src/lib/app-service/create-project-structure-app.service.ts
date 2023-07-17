import { singleton } from "tsyringe";
import { SimpleMessageAppService } from "@lib/logger";
import {
  CreateWsFileAppService,
  ProjectTypeEnum, WorkspaceFileEnum, WorkspaceFolderEnum,
  WsDomainStoreService
} from "@lib/repox-workspace";
import {
  FileUtilsService,
  FolderUtilsService,
  PathUtilsService, RunCommandUtilsService
} from "@lib/utils";

@singleton()
/**
 * The app service is responsible for generate project structure
 * of files and folders.
 */
export class CreateProjectStructureAppService {
  constructor(
    private readonly simpleMessage: SimpleMessageAppService,
    private readonly wsDomainStore: WsDomainStoreService,
    private readonly pathUtils: PathUtilsService,
    private readonly folderUtils: FolderUtilsService,
    private readonly fileUtils: FileUtilsService,
    private readonly runCommandUtils: RunCommandUtilsService,
    private readonly createWsFile: CreateWsFileAppService
  ) {
  }

  run(projectName: string): boolean {
    this.simpleMessage.writePlain(
      `Creating a project workspace structure`
    );
    const project = this.wsDomainStore.getProject(projectName);
    if (!project) {
      this.simpleMessage.writeError(
        `Project ${projectName} does not exist in the store!`
      );
      return false;
    }
    const currentPath = this.pathUtils.getCurrentPath();
    switch (project.type) {
      case ProjectTypeEnum.app:
        this.createAppTsProjectStructure(project.path);
        break;
      case ProjectTypeEnum.lib:
      case ProjectTypeEnum.tool:
        this.createLibToolTsProjectStructure(project.path);
        break;
      default:
        throw new Error("Not supported project type!");
    }
    this.pathUtils.changePath(currentPath);
    return true;
  }

  private createAppTsProjectStructure(projectPath: string): void {
    this.folderUtils.createFolder(projectPath);
    this.pathUtils.changePath(projectPath);
    this.folderUtils.createFolder(WorkspaceFolderEnum.src);
    this.pathUtils.changePath(WorkspaceFolderEnum.src);
    this.fileUtils.createEmptyFile(WorkspaceFileEnum.mainTsFile);
    this.pathUtils.changePath("../");
    this.runCommandUtils.runCommand("npm init -y");
    this.fileUtils.writeJsonFile(
      WorkspaceFileEnum.jestConfigTsFile,
      this.createWsFile.buildProjectJestConfigTsContentFile()
    );
    this.fileUtils.writeJsonFile(
      WorkspaceFileEnum.tsconfigJsonFile,
      this.createWsFile.buildProjectTsconfigJsonContentFile()
    );
  }

  private createLibToolTsProjectStructure(projectPath: string): void {
    this.folderUtils.createFolder(projectPath);
    this.pathUtils.changePath(projectPath);
    this.folderUtils.createFolder(WorkspaceFolderEnum.src);
    this.pathUtils.changePath(WorkspaceFolderEnum.src);
    this.folderUtils.createFolder(WorkspaceFolderEnum.lib);
    this.fileUtils.createEmptyFile(WorkspaceFileEnum.indexTsFile);
    this.pathUtils.changePath(WorkspaceFolderEnum.lib);
    this.fileUtils.createEmptyFile(WorkspaceFileEnum.gitkeepTextFile);
    this.pathUtils.changePath("../../");
    this.runCommandUtils.runCommand("npm init -y");
    this.fileUtils.writeJsonFile(
      WorkspaceFileEnum.jestConfigTsFile,
      this.createWsFile.buildProjectJestConfigTsContentFile()
    );
    this.fileUtils.writeJsonFile(
      WorkspaceFileEnum.tsconfigJsonFile,
      this.createWsFile.buildProjectTsconfigJsonContentFile()
    );
  }
}
