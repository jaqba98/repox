import { singleton } from "tsyringe";
import { SimpleMessageAppService } from "@lib/logger";
import {
  FileUtilsService,
  FolderUtilsService,
  PathUtilsService,
  RunCommandUtilsService
} from "@lib/utils";
import {
  CreateWsFileAppService,
  WorkspaceFileEnum,
  WorkspaceFolderEnum
} from "@lib/repox-workspace";

@singleton()
/**
 * The app service is responsible for generate workspace structure
 * of files and folders.
 */
export class CreateWsStructureAppService {
  constructor(
    private readonly simpleMessage: SimpleMessageAppService,
    private readonly folderUtils: FolderUtilsService,
    private readonly pathUtils: PathUtilsService,
    private readonly fileUtils: FileUtilsService,
    private readonly runCommandUtils: RunCommandUtilsService,
    private readonly writeFile: FileUtilsService,
    private readonly createWsFile: CreateWsFileAppService
  ) {
  }

  run(workspaceName: string): boolean {
    this.simpleMessage.writePlain(
      `Creating a ${workspaceName} workspace structure`
    );
    // Generate a root folder
    this.simpleMessage.writePlain("Generate a root folder");
    this.folderUtils.createFolder(workspaceName);
    this.pathUtils.changePath(workspaceName);
    // Generate a projects folder
    this.simpleMessage.writePlain("Generate a projects folder");
    this.folderUtils.createFolder(WorkspaceFolderEnum.projects);
    this.pathUtils.changePath(WorkspaceFolderEnum.projects);
    // Generate an applications folder with content
    this.simpleMessage.writePlain(
      "Generate an applications folder with content"
    );
    this.folderUtils.createFolder(WorkspaceFolderEnum.apps);
    this.pathUtils.changePath(WorkspaceFolderEnum.apps);
    this.fileUtils.createEmptyFile(WorkspaceFileEnum.gitkeepTextFile);
    this.pathUtils.changePath("../");
    // Generate a libraries folder with content
    this.simpleMessage.writePlain(
      "Generate a libraries folder with content"
    );
    this.folderUtils.createFolder(WorkspaceFolderEnum.libs);
    this.pathUtils.changePath(WorkspaceFolderEnum.libs);
    this.fileUtils.createEmptyFile(WorkspaceFileEnum.gitkeepTextFile);
    this.pathUtils.changePath("../");
    // Generate a tools folder with content
    this.simpleMessage.writePlain(
      "Generate a tools folder with content"
    );
    this.folderUtils.createFolder(WorkspaceFolderEnum.tools);
    this.pathUtils.changePath(WorkspaceFolderEnum.tools);
    this.fileUtils.createEmptyFile(WorkspaceFileEnum.gitkeepTextFile);
    this.pathUtils.changePath("../../");
    // Generate the .gitignore file
    this.simpleMessage.writePlain("Generate the .gitignore file");
    this.writeFile.writeTextFile(
      WorkspaceFileEnum.gitignoreTextFile,
      this.createWsFile.buildDefaultGitignoreContentFile()
    );
    // Generate the jest.config.ts file
    this.simpleMessage.writePlain("Generate the jest.config.ts file");
    this.writeFile.writeTextFile(
      WorkspaceFileEnum.jestConfigTsFile,
      this.createWsFile.buildDefaultRootJestConfigTsContentFile()
    );
    // Generate the repox.json file
    this.simpleMessage.writePlain("Generate the repox.json file");
    this.writeFile.writeJsonFile(
      WorkspaceFileEnum.repoxJsonFile,
      this.createWsFile.buildDefaultRepoxJsonContentFile()
    );
    // Generate the tsconfig.json file
    this.simpleMessage.writePlain("Generate the tsconfig.json file");
    this.writeFile.writeJsonFile(
      WorkspaceFileEnum.tsconfigJsonFile,
      this.createWsFile.buildDefaultTsconfigJsonContentFile()
    );
    return true;
  }
}
