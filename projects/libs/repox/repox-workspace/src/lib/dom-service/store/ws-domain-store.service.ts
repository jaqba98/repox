import {singleton} from "tsyringe";
import {ProjectTypeEnum, WsDtoStoreService, type WsProjectDomainModel} from "@lib/repox-workspace";
import {type WsDomainModel} from "../../model/ws-domain/ws-domain.model";
import {BuildProjectAliasService} from "../service/build-project-alias.service";
import {EMPTY_STRING} from "@lib/const";
import {PathUtilsService} from "@lib/utils";

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
                        type: project.type ?? ProjectTypeEnum.unknown,
                        path: project.path ?? EMPTY_STRING,
                        src: project.src ?? EMPTY_STRING,
                        assets: project.assets ?? [],
                        changed: false
                    };
                })
                .map(project => ({...project, alias: this.wsDtoStore.getProjectAlias(project.src)}))
                .map(project => ({...project, indexPath: this.wsDtoStore.getProjectIndexPath(project.alias)}))
        };
    }

    saveWsDomain(): void {
        this.getWsDomain().projects
            .filter(project => project.changed)
            .forEach(project => this.wsDtoStore.addProjectDto(project));
    }

    getWsDomain(): WsDomainModel {
        if (this.wsDomain === undefined) {
            throw new Error(`The store is undefined!`);
        }
        return this.wsDomain;
    }

    getProjectByName(projectName: string): WsProjectDomainModel | undefined {
        return this.getWsDomain().projects.find(project => project.name === projectName);
    }

    getProject(projectName: string): WsProjectDomainModel | undefined {
        return this.getWsDomain().projects
            .find(project => project.name === projectName);
    }

    addProject(projectName: string, projectType: ProjectTypeEnum, projectPath: string): void {
        if (this.wsDomain === undefined) {
            throw new Error(`The store is undefined!`);
        }
        this.wsDomain.projects.push({
            name: projectName,
            type: projectType,
            path: projectPath,
            src: this.pathUtils.createPath(projectPath, 'src'),
            assets: [],
            alias: this.getProjectAlias(projectName, projectType),
            indexPath: this.getProjectIndexPath(projectPath),
            changed: true
        });
    }

    // private getProjectBuild(): WsProjectBuildDomainModel {
    //     return {
    //         output: EMPTY_STRING,
    //         main: EMPTY_STRING,
    //         assets: []
    //     };
    // }

    private getProjectAlias(projectName: string, projectType: ProjectTypeEnum): string {
        return this.buildProjectAlias.buildAlias(projectName, projectType);
    }

    private getProjectIndexPath(projectPath: string): string[] {
        return [this.pathUtils.createPath(projectPath, 'src', "WorkspaceFileEnum.indexTsFile")];
    }
}

