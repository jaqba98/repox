import { singleton } from "tsyringe";
import { SimpleMessageAppService } from "@lib/logger";
import {
  BuildProjectAliasService,
  BuildProjectPathService,
  ProjectSchemeEnum,
  ProjectTypeEnum,
  WorkspaceFileEnum,
  WorkspaceFolderEnum,
  WsDomainStoreService,
  WsProjectBuildDomainModel
} from "@lib/repox-workspace";
import { EMPTY_STRING } from "@lib/const";
import { PathUtilsService } from "@lib/utils";

@singleton()
/**
 * The app service is responsible for add new project to the store.
 */
export class AddProjectAppService {
  constructor(
    private readonly simpleMessage: SimpleMessageAppService,
    private readonly buildProjectAlias: BuildProjectAliasService,
    private readonly buildProjectPath: BuildProjectPathService,
    private readonly pathUtils: PathUtilsService,
    private readonly wsDomainStore: WsDomainStoreService
  ) {
  }

  add(
    projectName: string, projectType: string, projectPath: string,
    projectScheme: string
  ): boolean {
    this.simpleMessage.writePlain("Add project to the store");
    const type = <ProjectTypeEnum>projectType;
    const path = this.buildProjectPath.buildPath(
      projectName, projectType, projectPath
    );
    const scheme = <ProjectSchemeEnum>projectScheme;
    const projectAlias = this.buildProjectAlias.buildAlias(
      projectName, projectType
    );
    const indexPath = this.buildProjectPath.buildIndexPath(path);
    const projectBuild = this.buildProjectBuild(
      projectName, path, scheme
    );
    this.wsDomainStore.addProject(
      projectName, type, path, scheme, projectAlias, indexPath,
      projectBuild
    );
    return true;
  }

  private buildProjectBuild(
    projectName: string,
    path: string,
    scheme: ProjectSchemeEnum
  ): WsProjectBuildDomainModel {
    switch (scheme) {
      case ProjectSchemeEnum.appTypeScript:
        return {
          output: this.pathUtils.createPath(
            [WorkspaceFolderEnum.dist, projectName]
          ),
          main: this.pathUtils.createPath([
            path, WorkspaceFolderEnum.src,
            WorkspaceFileEnum.mainTsFile
          ]),
          assets: []
        };
      case ProjectSchemeEnum.libTypeScript:
      case ProjectSchemeEnum.toolTypeScript:
        return {
          output: EMPTY_STRING,
          main: EMPTY_STRING,
          assets: []
        };
      default:
        throw new Error("Not supported scheme type!");
    }
  }
}
