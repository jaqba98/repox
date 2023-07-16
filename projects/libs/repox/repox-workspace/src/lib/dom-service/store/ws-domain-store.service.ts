import { singleton } from "tsyringe";
import {
  ProjectSchemeEnum,
  ProjectTypeEnum,
  WsDtoStoreService
} from "@lib/repox-workspace";
import {
  WsDomainModel, WsProjectBuildDomainModel,
  WsProjectDomainModel
} from "../../model/ws-domain/ws-domain.model";
import {
  BuildProjectAliasService
} from "../builder/build-project-alias.service";

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

  createWsDomain(): void {
    this.wsDomain = {
      projects: Object
        .values(this.wsDtoStore.getWsRepoxDto().projects)
        .map(project => ({
          name: project.name,
          type: project.type,
          path: project.path,
          scheme: project.scheme,
          build: {
            ...project.build
          },
          alias: this.buildProjectAlias.buildAlias(
            project.name, project.type
          )
        }))
        .map(project => ({
          ...project,
          indexPath: this.wsDtoStore.getProjectIndexPath(
            project.alias
          ),
          changed: false
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
    return this.getWsDomain().projects
      .find(project => project.name === projectName);
  }

  addProject(
    projectName: string, projectType: ProjectTypeEnum,
    projectPath: string, projectScheme: ProjectSchemeEnum,
    projectAlias: string, projectIndexPath: Array<string>,
    build: WsProjectBuildDomainModel
  ): void {
    if (this.wsDomain === undefined) {
      throw new Error("The store is undefined!");
    }
    this.wsDomain.projects.push({
      name: projectName,
      type: projectType,
      path: projectPath,
      scheme: projectScheme,
      build: build,
      alias: projectAlias,
      indexPath: projectIndexPath,
      changed: true
    });
  }
}
