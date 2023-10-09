import {singleton} from "tsyringe";
import {WsRepoxDtoModel, WsRepoxProjectDtoModel} from "../../model/ws-dto/ws-repox-dto.model";
import {WsTsconfigDtoModel} from "../../model/ws-dto/ws-tsconfig-dto.model";
import {FileUtilsService} from "@lib/utils";
import {Validator, ValidatorResult} from "jsonschema";
import {WorkspaceFileEnum} from "../../enum/workspace/workspace-file.enum";
import {WsProjectDomainModel} from "../../model/ws-domain/ws-domain.model";
import {EMPTY_STRING} from "@lib/const";
import {repoxJsonFileSchema, tsconfigJsonFileSchema} from "../../const/schema.const";

@singleton()
/**
 * The dto store service is responsible for store all
 * configuration file content directly from files.
 */
export class WsDtoStoreService {
    private wsRepoxDto: WsRepoxDtoModel | undefined;
    private wsTsconfigDto: WsTsconfigDtoModel | undefined;

    constructor(
        private readonly fileUtils: FileUtilsService,
        private readonly validator: Validator
    ) {
    }

    loadWsDto(): void {
        this.wsRepoxDto = this.fileUtils.readJsonFile<WsRepoxDtoModel>(WorkspaceFileEnum.repoxJsonFile);
        this.wsTsconfigDto = this.fileUtils.readJsonFile<WsTsconfigDtoModel>(WorkspaceFileEnum.tsconfigJsonFile);
    }

    // todo: I am here
    // saveWsDto(): void {
    //     if (this.wsRepoxDto === undefined) {
    //         throw new Error(`The repox store is undefined!`);
    //     }
    //     if (this.wsTsconfigDto === undefined) {
    //         throw new Error(`The tsconfig store is undefined!`);
    //     }
    //     this.file.writeJsonFile<WsRepoxDtoModel>(
    //         WorkspaceFileEnum.repoxJsonFile, this.wsRepoxDto
    //     );
    //     this.file.writeJsonFile<WsTsconfigDtoModel>(
    //         WorkspaceFileEnum.tsconfigJsonFile, this.wsTsconfigDto
    //     );
    // }

    getWsRepoxDto(): WsRepoxDtoModel {
        if (this.wsRepoxDto === undefined) {
            throw new Error(`The repox store is undefined!`);
        }
        return this.wsRepoxDto;
    }

    getWsTsconfigDto(): WsTsconfigDtoModel {
        if (this.wsTsconfigDto === undefined) {
            throw new Error(`The tsconfig store is undefined!`);
        }
        return this.wsTsconfigDto;
    }

    getWsRepoxDtoProjects(): WsRepoxProjectDtoModel[] {
        const {projects} = this.getWsRepoxDto();
        if (projects === undefined) {
            throw new Error(`The projects in repox store is undefined!`);
        }
        return Object.values(projects);
    }

    addProjectDto(project: WsProjectDomainModel): void {
        if (this.wsRepoxDto === undefined) {
            throw new Error(`The repox store is undefined!`);
        }
        if (this.wsRepoxDto.projects === undefined) {
            throw new Error(`The projects in repox store is undefined!`);
        }
        if (this.wsTsconfigDto === undefined) {
            throw new Error(`The tsconfig store is undefined!`);
        }
        this.wsRepoxDto.projects[project.name] = {
            name: project.name === EMPTY_STRING ? undefined : project.name,
            type: project.type,
            path: project.path === EMPTY_STRING ? undefined : project.path,
            src: project.src === EMPTY_STRING ? undefined : project.src,
            assets: project.build.assets.length === 0
                ? undefined
                : project.build.assets
        };
        if (project.alias === EMPTY_STRING) return;
        this.wsTsconfigDto.compilerOptions
            .paths[project.alias] = project.indexPath;
    }

    getProjectIndexPath(
        projectAlias: string, projectType: string | undefined
    ): string[] {
        if (projectType === EMPTY_STRING || projectType === undefined) {
            return [];
        }
        const tsconfigDto = this.getWsTsconfigDto();
        return tsconfigDto.compilerOptions.paths[projectAlias] ?? [];
    }

    verifyWsRepoxDto(): ValidatorResult {
        this.validator.addSchema(
            repoxJsonFileSchema, `/RepoxJsonFileSchema`
        );
        return this.validator.validate(
            this.wsRepoxDto, repoxJsonFileSchema
        );
    }

    verifyWsTsconfigDto(): ValidatorResult {
        this.validator.addSchema(
            tsconfigJsonFileSchema, `/TsconfigJsonFileSchema`
        );
        return this.validator.validate(
            this.wsTsconfigDto, tsconfigJsonFileSchema
        );
    }
}

// todo: refactor the file
