import { singleton } from "tsyringe";
import {
  ProjectSchemeEnum,
  ProjectTypeEnum,
  WorkspaceFileEnum,
  WorkspaceFolderEnum,
  WsDtoStoreService,
  WsProjectBuildDomainModel,
  WsProjectDomainModel
} from "@lib/repox-workspace";
import { WsDomainModel } from "../../model/ws-domain/ws-domain.model";
import {
  BuildProjectAliasService
} from "../builder/build-project-alias.service";
import { EMPTY_STRING } from "@lib/const";
import { PathUtilsService } from "@lib/utils";

@singleton()
/**
 * The domain store service is responsible for store
 * domain workspace configuration.
 */
export class WsDomainStoreService {
  private wsDomain: WsDomainModel | undefined;

  constructor(
    private readonly wsDtoStore: WsDtoStoreService,
    private readonly buildProjectAlias: BuildProjectAliasService,
    private readonly pathUtils: PathUtilsService
  ) {
  }

  loadWsDomain(): void {
    this.wsDomain = {
      projects: this.wsDtoStore.getWsRepoxDtoProjects()
        .map(project => {
          return {
            name: project.name ?? EMPTY_STRING,
            type: project.type ?? EMPTY_STRING,
            path: project.path ?? EMPTY_STRING,
            scheme: project.scheme ?? EMPTY_STRING,
            build: {
              output: project.build?.output ?? EMPTY_STRING,
              main: project.build?.main ?? EMPTY_STRING,
              assets: project.build?.assets ?? []
            },
            changed: false
          };
        })
        .map(project => ({
          ...project,
          alias: this.buildProjectAlias.buildAlias(
            project.name, project.type
          )
        }))
        .map(project => ({
          ...project,
          indexPath: this.wsDtoStore.getProjectIndexPath(
            project.alias, project.type
          )
        }))
    };
  }

  getWsDomain(): WsDomainModel {
    if (this.wsDomain === undefined) {
      throw new Error("The store is undefined!");
    }
    return this.wsDomain;
  }

  getProjectBeName(
    projectName: string
  ): WsProjectDomainModel | undefined {
    return this.getWsDomain().projects.find(
      project => project.name === projectName
    );
  }

  addProject(
    projectName: string, projectType: ProjectTypeEnum,
    projectPath: string, projectScheme: ProjectSchemeEnum
  ): void {
    if (this.wsDomain === undefined) {
      throw new Error("The store is undefined!");
    }
    const projectAlias = this.buildProjectAlias.buildAlias(
      projectName, projectType
    );
    this.wsDomain.projects.push({
      name: projectName,
      type: projectType,
      path: projectPath,
      scheme: projectScheme,
      build: this.getProjectBuild(
        projectScheme, projectPath, projectName
      ),
      alias: projectAlias,
      indexPath: this.getProjectIndexPath(projectScheme, projectPath),
      changed: true
    });
  }

  private getProjectBuild(
    projectScheme: ProjectSchemeEnum,
    projectPath: string,
    projectName: string
  ): WsProjectBuildDomainModel {
    switch (projectScheme) {
      case ProjectSchemeEnum.appTypeScript:
        return {
          output: this.pathUtils.createPath([
            WorkspaceFolderEnum.dist, projectName
          ]),
          main: this.pathUtils.createPath([
            projectPath, WorkspaceFolderEnum.src,
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
        throw new Error("Not supported project scheme");
    }
  }

  private getProjectIndexPath(
    projectScheme: ProjectSchemeEnum,
    projectPath: string
  ): Array<string> {
    switch (projectScheme) {
      case ProjectSchemeEnum.appTypeScript:
        return [];
      case ProjectSchemeEnum.libTypeScript:
      case ProjectSchemeEnum.toolTypeScript:
        return [
          this.pathUtils.createPath([
            projectPath, WorkspaceFolderEnum.src,
            WorkspaceFileEnum.indexTsFile
          ])
        ];
      default:
        throw new Error("Not supported project scheme");
    }
  }
}
