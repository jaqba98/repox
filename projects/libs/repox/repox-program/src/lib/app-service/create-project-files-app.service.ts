import { singleton } from "tsyringe";
import {SimpleMessageAppService} from "@lib/logger";
import { WsDomainStoreService } from "@lib/repox-workspace";

@singleton()
/**
 * The app service is responsible for generate project structure
 * of files and folders.
 */
export class CreateProjectFilesAppService {
    constructor(
        private readonly simpleMessage: SimpleMessageAppService,
        private readonly wsDomainStore: WsDomainStoreService
        // private readonly pathUtils: PathUtilsService,
        // private readonly folderUtils: FolderUtilsService,
        // private readonly fileUtils: FileUtilsService,
        // private readonly runCommandUtils: RunCommandUtilsService,
        // private readonly createWsFile: CreateWsFileAppService
    ) {
    }

    run(projectName: string): boolean {
        this.simpleMessage.writePlain(`Step: Generate Workspace`);
        const project = this.wsDomainStore.getProject(projectName);
        console.log(project);
        // if (project == null) {
        //   this.simpleMessage.writeError(
        //     `Project ${projectName} does not exist in the store!`
        //   );
        //   return false;
        // }
        // const currentPath = this.pathUtils.getCurrentPath();
        // switch (project.scheme) {
        //   case ProjectSchemeEnum.blank:
        //     this.createBlankProjectStructure(project.path);
        //     break;
        //   case ProjectSchemeEnum.htmlPro:
        //     this.createBlankProjectStructure(project.path);
        //     break;
        //   case ProjectSchemeEnum.appTypeScript:
        //     this.createHtmlProProjectStructure(project.path);
        //     break;
        //   case ProjectSchemeEnum.libTypeScript:
        //   case ProjectSchemeEnum.toolTypeScript:
        //     this.createLibToolTsProjectStructure(project.path);
        //     break;
        //   default:
        //     throw new Error(`Not supported project scheme!`);
        // }
        // this.pathUtils.changePath(currentPath);
        return true;
    }

    // private createBlankProjectStructure (projectPath: string): void {
    //   this.folderUtils.createFolder(projectPath);
    //   this.pathUtils.changePath(projectPath);
    //   this.folderUtils.createFolder(WorkspaceFolderEnum.src);
    //   this.pathUtils.changePath(WorkspaceFolderEnum.src);
    //   this.fileUtils.createEmptyFile(WorkspaceFileEnum.gitignoreTextFile);
    //   this.pathUtils.changePath(`../`);
    //   this.runCommandUtils.runCommand(`npm init -y`);
    //   this.fileUtils.writeTextFile(
    //     WorkspaceFileEnum.jestConfigJsFile,
    //     this.createWsFile.buildProjectJestConfigTsContentFile(projectPath)
    //   );
    // }

    // private createHtmlProProjectStructure (projectPath: string): void {
    //   this.folderUtils.createFolder(projectPath);
    //   this.pathUtils.changePath(projectPath);
    //   this.folderUtils.createFolder(WorkspaceFolderEnum.src);
    //   this.pathUtils.changePath(WorkspaceFolderEnum.src);
    //   this.fileUtils.createEmptyFile(WorkspaceFileEnum.gitignoreTextFile);
    //   this.pathUtils.changePath(`../`);
    //   this.runCommandUtils.runCommand(`npm init -y`);
    //   this.fileUtils.writeTextFile(
    //     WorkspaceFileEnum.jestConfigJsFile,
    //     this.createWsFile.buildProjectJestConfigTsContentFile(projectPath)
    //   );
    // }

    // private createAppTsProjectStructure (projectPath: string): void {
    //   this.folderUtils.createFolder(projectPath);
    //   this.pathUtils.changePath(projectPath);
    //   this.folderUtils.createFolder(WorkspaceFolderEnum.src);
    //   this.pathUtils.changePath(WorkspaceFolderEnum.src);
    //   this.fileUtils.createEmptyFile(WorkspaceFileEnum.mainTsFile);
    //   this.pathUtils.changePath(`../`);
    //   this.runCommandUtils.runCommand(`npm init -y`);
    //   this.fileUtils.writeTextFile(
    //     WorkspaceFileEnum.jestConfigJsFile,
    //     this.createWsFile.buildProjectJestConfigTsContentFile(projectPath)
    //   );
    //   this.fileUtils.writeJsonFile(
    //     WorkspaceFileEnum.tsconfigJsonFile,
    //     this.createWsFile.buildProjectTsconfigJsonContentFile(projectPath)
    //   );
    // }

    // private createLibToolTsProjectStructure (projectPath: string): void {
    //   this.folderUtils.createFolder(projectPath);
    //   this.pathUtils.changePath(projectPath);
    //   this.folderUtils.createFolder(WorkspaceFolderEnum.src);
    //   this.pathUtils.changePath(WorkspaceFolderEnum.src);
    //   this.folderUtils.createFolder(WorkspaceFolderEnum.lib);
    //   this.fileUtils.createEmptyFile(WorkspaceFileEnum.indexTsFile);
    //   this.pathUtils.changePath(WorkspaceFolderEnum.lib);
    //   this.fileUtils.createEmptyFile(WorkspaceFileEnum.gitignoreTextFile);
    //   this.pathUtils.changePath(`../../`);
    //   this.runCommandUtils.runCommand(`npm init -y`);
    //   this.fileUtils.writeTextFile(
    //     WorkspaceFileEnum.jestConfigJsFile,
    //     this.createWsFile.buildProjectJestConfigTsContentFile(projectPath)
    //   );
    //   this.fileUtils.writeJsonFile(
    //     WorkspaceFileEnum.tsconfigJsonFile,
    //     this.createWsFile.buildProjectTsconfigJsonContentFile(projectPath)
    //   );
    // }
}
