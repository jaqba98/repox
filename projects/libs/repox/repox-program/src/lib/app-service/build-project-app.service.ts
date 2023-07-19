import { singleton } from "tsyringe";
import { SimpleMessageAppService } from "@lib/logger";
import {
  ProjectSchemeEnum,
  ProjectTypeEnum,
  WorkspaceFileEnum,
  WsDomainStoreService,
  WsProjectDomainModel
} from "@lib/repox-workspace";
import { PathUtilsService, RunCommandUtilsService } from "@lib/utils";

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
    private readonly runCommandUtils: RunCommandUtilsService
  ) {
  }

  run(projectName: string): boolean {
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
    switch (project.scheme) {
      case ProjectSchemeEnum.appTypeScript:
        if (!this.buildProjectAppTypescript(project)) return false;
        break;
      default:
        throw new Error("Not supported project scheme");
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
    // todo: I am here
    // project.assets.forEach((asset: any) => {
    //   this.fileUtils.copyFile(
    //     `${asset.inputDir}/${asset.fileName}`,
    //     `${asset.outputDir}/${asset.fileName}`
    //   );
    // })
    return true;
  }
}
