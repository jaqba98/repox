import { singleton } from "tsyringe";
import {
  ProjectSchemeEnum,
  ProjectTypeEnum,
  WsDtoStoreService
} from "@lib/repox-workspace";
import { WsDomainModel } from "../../model/ws-domain/ws-domain.model";
import {
  BuildProjectAliasService
} from "../builder/build-project-alias.service";
import { EMPTY_STRING } from "@lib/const";

@singleton()
/**
 * The domain store service is responsible for store
 * domain workspace configuration.
 */
export class WsDomainStoreService {
  private wsDomain: WsDomainModel | undefined;

  constructor(
    private readonly wsDtoStore: WsDtoStoreService,
    private readonly buildProjectAlias: BuildProjectAliasService
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
            project.alias
          )
        }))
    };
  }

  // saveWsDomain(): void {
  //   if (this.wsDomain === undefined) {
  //     throw new Error("The store is undefined!");
  //   }
  //   const changedProjects = this.wsDomain.projects
  //     .filter(project => project.changed);
  //   changedProjects.forEach(project => {
  //     const {
  //       name, type, path, scheme, build, alias, indexPath
  //     } = project;
  //     this.wsDtoStore.addProjectDto(
  //       name, type, path, scheme, build, alias, indexPath
  //     )
  //   });
  // }

  // getWsDomain(): WsDomainModel {
  //   if (this.wsDomain === undefined) {
  //     throw new Error("The store is undefined!");
  //   }
  //   return this.wsDomain;
  // }

  // getProjectBeName(
  //   projectName: string
  // ): WsProjectDomainModel | undefined {
  //   return this.getWsDomain().projects
  //     .find(project => project.name === projectName);
  // }

  // addProject(
  //   projectName: string, projectType: ProjectTypeEnum,
  //   projectPath: string, projectScheme: ProjectSchemeEnum,
  //   projectAlias: string, projectIndexPath: Array<string>,
  //   build: WsProjectBuildDomainModel
  // ): void {
  //   if (this.wsDomain === undefined) {
  //     throw new Error("The store is undefined!");
  //   }
  //   this.wsDomain.projects.push({
  //     name: projectName,
  //     type: projectType,
  //     path: projectPath,
  //     scheme: projectScheme,
  //     build: build,
  //     alias: projectAlias,
  //     indexPath: projectIndexPath,
  //     changed: true
  //   });
  // }
}
