import { singleton } from "tsyringe";
import {
  NewlineAppService,
  SimpleMessageAppService
} from "@lib/logger";
import {
  ProjectTypeEnum,
  WorkspaceFileEnum,
  WorkspaceFolderEnum,
  WsDomainStoreService,
  type WsProjectDomainModel
} from "@lib/repox-workspace";
import {
  FileUtilsService,
  FolderUtilsService,
  PathUtilsService,
  RunCommandUtilsService
} from "@lib/utils";
import { watch } from "fs";

@singleton()
/**
 * The app service is responsible for build project
 * to the dist folder.
 */
export class BuildProjectAppService {
  constructor (
    private readonly simpleMessage: SimpleMessageAppService,
    private readonly wsDomainStore: WsDomainStoreService,
    private readonly pathUtils: PathUtilsService,
    private readonly runCommandUtils: RunCommandUtilsService,
    private readonly fileUtils: FileUtilsService,
    private readonly folderUtils: FolderUtilsService,
    private readonly newline: NewlineAppService
  ) {
  }

  run (projectName: string, buildWatch: boolean): boolean {
    this.simpleMessage.writePlain(`Build the project`);
    const project = this.wsDomainStore.getProject(projectName);
    if (project === undefined) {
      this.simpleMessage.writeError(
        `The ${projectName} project does not exist!`
      );
      this.simpleMessage.writeWarning(
        `Specify a different project name and restart the program`
      );
      return false;
    }
    if (project.type !== ProjectTypeEnum.appTs) {
      this.simpleMessage.writeError(
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        `Could not build a project of type ${project.type}.`
      );
      this.simpleMessage.writeError(
        `It it only possible to build applications!`
      );
      this.simpleMessage.writeError(
        `Other types of projects will be build as dependencies!`
      );
      return false;
    }
    if (buildWatch) {
      this.buildProjectAppTypescript(project);
      this.buildWatch(project);
      return true;
    }
    this.buildProjectAppTypescript(project);
    this.newline.writeNewline();
    this.simpleMessage.writeSuccess(`Project built correctly`);
    return true;
  }

  private buildWatch (project: WsProjectDomainModel): void {
    const watcher = watch(
      WorkspaceFolderEnum.projects, { recursive: true }
    );
    watcher.on(`change`, (_, filename): void => {
      if (this.folderUtils.isFolder(filename.toString())) {
        this.simpleMessage.writePlain(`Rebuilding the project`);
      }
      this.buildProjectAppTypescript(project);
      if (this.folderUtils.isFolder(filename.toString())) {
        this.simpleMessage.writeSuccess(`Project built correctly`);
      }
    });
  }

  private buildProjectAppTypescript (
    project: WsProjectDomainModel
  ): boolean {
    const projectTsconfig = this.pathUtils.createPath(
      project.path, WorkspaceFileEnum.tsconfigJsonFile
    );
    if (!this.pathUtils.existPath(projectTsconfig)) {
      this.simpleMessage.writeError(
        `There is no tsconfig.json file for the project.`
      );
      return false;
    }
    const projectArg = `--project ${projectTsconfig}`;
    // const distArg = `--outDir ${project.build.output}`;
    const distArg = `--outDir`;
    this.runCommandUtils.runNpxCommand(
      `tsc ${projectArg} ${distArg} --noEmit`, true
    );
    this.runCommandUtils.runNpxCommand(
      `tsc ${projectArg} ${distArg}`, true
    );
    this.runCommandUtils.runNpxCommand(
      `tsc-alias ${distArg}`, true
    );
    // this.copyAssets(project.build.assets);
    return true;
  }

  // private copyAssets (assets: WsAssetsDomainModel[]): void {
  //   assets
  //     .map(asset => ({
  //       output: asset.output,
  //       files: this.fileUtils.readProjectFiles(asset.input)
  //     }))
  //     .map(asset => asset.files.map(file => ({
  //       file, output: asset.output
  //     })))
  //     .flat()
  //     .forEach(asset => { this.fileUtils.copyFile(asset.file, asset.output); }
  //     );
  // }
}
// todo: refactor the file
