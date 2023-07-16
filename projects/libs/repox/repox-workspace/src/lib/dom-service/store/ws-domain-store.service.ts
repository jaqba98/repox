import { singleton } from "tsyringe";
import { WsDtoStoreService } from "@lib/repox-workspace";
import { WsDomainModel } from "../../model/ws-domain/ws-domain.model";
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
          indexPath: this.wsDtoStore.getProjectIndexPath(project.alias)
        }))
    };
  }
}
