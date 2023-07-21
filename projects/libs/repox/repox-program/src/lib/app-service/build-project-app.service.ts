import { singleton } from "tsyringe";
import {
  NewlineAppService,
  SimpleMessageAppService
} from "@lib/logger";
import {
  ProjectSchemeEnum,
  ProjectTypeEnum,
  WorkspaceFileEnum,
  WsAssetsDomainModel,
  WsDomainStoreService,
  WsProjectDomainModel
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
  constructor(
    private readonly simpleMessage: SimpleMessageAppService,
    private readonly wsDomainStore: WsDomainStoreService,
    private readonly pathUtils: PathUtilsService,
    private readonly runCommandUtils: RunCommandUtilsService,
    private readonly fileUtils: FileUtilsService,
    private readonly folderUtils: FolderUtilsService,
    private readonly newline: NewlineAppService
  ) {
  }

  run(projectName: string, buildWatch: boolean): boolean {
    this.simpleMessage.writePlain("Build the project");
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
    if (project.type !== ProjectTypeEnum.app) {
      this.simpleMessage.writeError(
        `Could not build a project of type ${project.type}.`
      );
      this.simpleMessage.writeError(
        "It it only possible to build applications!"
      );
      this.simpleMessage.writeError(
        "Other types of projects will be build as dependencies!"
      );
      return false;
    }
    if (buildWatch) {
      this.buildWatch(project);
      return true;
    }
    this.buildImmediately(project);
    this.newline.writeNewline();
    this.simpleMessage.writeSuccess("Project built correctly");
    return true;
  }

  private buildWatch(project: WsProjectDomainModel): void {
    let timerId: any = null;
    const DEBOUNCE_DELAY = 1000;
    const watcher = watch(project.path, { recursive: true });
    watcher.on("change", (): void => {
      if (timerId) {
        clearTimeout(timerId);
      }
      this.buildImmediately(project);
      timerId = setTimeout((): void => {
        this.simpleMessage.writeSuccess("Project built correctly");
      }, DEBOUNCE_DELAY);
    })
  }

  private buildImmediately(project: WsProjectDomainModel): void {
    switch (project.scheme) {
      case ProjectSchemeEnum.blank:
        this.buildProjectBlank(project);
        break;
      case ProjectSchemeEnum.appTypeScript:
        this.buildProjectAppTypescript(project);
        break;
      default:
        throw new Error("Not supported project scheme");
    }
  }

  private buildProjectBlank(
    project: WsProjectDomainModel
  ): boolean {
    if (!this.pathUtils.existPath(project.build.output)) {
      this.folderUtils.createFolder(project.build.output);
    }
    if (project.build.assets.length > 0) {
      project.build.assets
        .forEach((asset: WsAssetsDomainModel): void => {
          this.fileUtils.copyFile(asset.input, asset.output);
        })
    }
    return true;
  }

  private buildProjectAppTypescript(
    project: WsProjectDomainModel
  ): boolean {
    const projectTsconfig = this.pathUtils.createPath([
      project.path, WorkspaceFileEnum.tsconfigJson
    ]);
    if (!this.pathUtils.existPath(projectTsconfig)) {
      this.simpleMessage.writeError(
        `There is no tsconfig.json file for the project.`
      );
      return false;
    }
    const projectArg = `--project ${projectTsconfig}`;
    const distArg = `--outDir ${project.build.output}`;
    this.runCommandUtils.runNpxCommand(
      `tsc ${projectArg} ${distArg} --noEmit`, true
    );
    this.runCommandUtils.runNpxCommand(
      `tsc ${projectArg} ${distArg}`, true
    );
    this.runCommandUtils.runNpxCommand(
      `tsc-alias ${distArg}`, true
    );
    if (project.build.assets.length > 0) {
      project.build.assets
        .forEach((asset: WsAssetsDomainModel): void => {
          this.fileUtils.copyFile(asset.input, asset.output);
        })
    }
    return true;
  }
}
