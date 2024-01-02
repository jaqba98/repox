import {singleton} from "tsyringe";
import {SimpleMessageAppService} from "@lib/logger";
import {
    CreateWsFileAppService,
    WorkspaceFileEnum,
    WorkspaceFolderEnum,
    WsDomainStoreService
} from "@lib/repox-workspace";
import {FileUtilsService, FolderUtilsService, PathUtilsService, RunCommandUtilsService} from "@lib/utils";

@singleton()
/**
 * The app service is responsible for generate project structure
 * of files and folders.
 */
export class CreateProjectFilesAppService {
    constructor(
        private readonly simpleMessage: SimpleMessageAppService,
        private readonly wsDomainStore: WsDomainStoreService,
        private readonly folderUtils: FolderUtilsService,
        private readonly pathUtils: PathUtilsService,
        private readonly fileUtils: FileUtilsService,
        private readonly runCommandUtils: RunCommandUtilsService,
        private readonly createWsFile: CreateWsFileAppService
    ) {
    }

    run(projectName: string): boolean {
        this.simpleMessage.writePlain(`Step: Generate Workspace`);
        const project = this.wsDomainStore.getProject(projectName);
        if (!project) {
            this.simpleMessage.writeError(`Project ${projectName} does not exist in the store!`);
            return false;
        }
        const currentPath = this.pathUtils.getCurrentPath();
        this.folderUtils.createFolder(project.path);
        this.pathUtils.changePath(project.path);
        this.folderUtils.createFolder(WorkspaceFolderEnum.src);
        this.pathUtils.changePath(WorkspaceFolderEnum.src);
        this.fileUtils.createEmptyFile(WorkspaceFileEnum.gitignoreTextFile);
        this.pathUtils.changePath(`../`);
        this.runCommandUtils.runCommand(`npm init -y`);
        this.fileUtils.writeTextFile(
            WorkspaceFileEnum.jestConfigJsFile,
            this.createWsFile.buildProjectJestConfigTsContentFile(project.path)
        );
        this.fileUtils.writeTextFile(
            WorkspaceFileEnum.tsconfigJsonFile,
            this.createWsFile.buildProjectTsconfigJsonContentFile(project.path)
        );
        this.pathUtils.changePath(currentPath);
        return true;
    }
}