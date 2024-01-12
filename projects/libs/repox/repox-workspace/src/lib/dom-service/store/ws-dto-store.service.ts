import {singleton} from "tsyringe";
import {RepoxJsonDtoModel} from "../../model/dto/repox-json-dto.model";
import {TsconfigJsonDtoModel} from "../../model/dto/tsconfig-json-dto.model";
import {FileUtilsService, PathUtilsService} from "@lib/utils";
import {Validator, ValidatorResult} from "jsonschema";
import {WsProjectDomainModel} from "../../model/ws-domain/ws-domain.model";
import {EMPTY_STRING} from "@lib/const";
import {repoxJsonFileSchema, tsconfigJsonFileSchema} from "../../const/schema.const";

@singleton()
/**
 * The dto store service is responsible for store all
 * configuration file content directly from files.
 */
export class WsDtoStoreService {
    private wsRepoxDto: RepoxJsonDtoModel | undefined;
    private wsTsconfigDto: TsconfigJsonDtoModel | undefined;

    constructor(
        private readonly fileUtils: FileUtilsService,
        private readonly validator: Validator,
        private readonly pathUtils: PathUtilsService
    ) {
    }

    loadWsDto(): void {
        this.wsRepoxDto = this.fileUtils.readJsonFile<RepoxJsonDtoModel>("WorkspaceFileEnum.repoxJsonFile");
        this.wsTsconfigDto = this.fileUtils.readJsonFile<TsconfigJsonDtoModel>("WorkspaceFileEnum.tsconfigJsonFile");
    }

    saveWsDto(): void {
        if (this.wsRepoxDto === undefined) {
            throw new Error(`The repox store is undefined!`);
        }
        if (this.wsTsconfigDto === undefined) {
            throw new Error(`The tsconfig store is undefined!`);
        }
        this.fileUtils.writeJsonFile<RepoxJsonDtoModel>("WorkspaceFileEnum.repoxJsonFile", this.wsRepoxDto);
        this.fileUtils.writeJsonFile<TsconfigJsonDtoModel>("WorkspaceFileEnum.tsconfigJsonFile", this.wsTsconfigDto);
    }

    getWsRepoxDto(): RepoxJsonDtoModel {
        if (this.wsRepoxDto === undefined) {
            throw new Error(`The repox store is undefined!`);
        }
        return this.wsRepoxDto;
    }

    getWsTsconfigDto(): TsconfigJsonDtoModel {
        if (this.wsTsconfigDto === undefined) {
            throw new Error(`The tsconfig store is undefined!`);
        }
        return this.wsTsconfigDto;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getWsRepoxDtoProjects(): any[] {
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
        // this.wsRepoxDto.projects[project.name] = {
        //     name: project.name === EMPTY_STRING ? undefined : project.name,
        //     type: project.type,
        //     path: project.path === EMPTY_STRING ? undefined : project.path,
        //     src: project.src === EMPTY_STRING ? undefined : project.src,
        //     assets: project.assets.length === 0 ? undefined : project.assets
        // };
        if (project.alias === EMPTY_STRING) return;
        // this.wsTsconfigDto.compilerOptions
        //     .paths[project.alias] = project.indexPath;
    }

    getProjectAlias(_projectSrc: string): string {
        return "";
        // const tsconfigDto = this.getWsTsconfigDto();
        // const projectIndexTs = this.pathUtils.createPath(
        //     tsconfigDto.compilerOptions.rootDir, projectSrc, "WorkspaceFileEnum.indexTsFile"
        // );
        // const alias = Object.keys(tsconfigDto.compilerOptions.paths)
        //     .find(pathAlias => tsconfigDto.compilerOptions.paths[pathAlias].includes(projectIndexTs));
        // return alias ?? EMPTY_STRING;
    }

    getProjectIndexPath(_projectAlias: string): string[] {
        // const tsconfigDto = this.getWsTsconfigDto();
        // return tsconfigDto.compilerOptions.paths[projectAlias] ?? [];
        return [];
    }

    verifyWsRepoxDto(): ValidatorResult {
        this.validator.addSchema(repoxJsonFileSchema, `/RepoxJsonFileSchema`);
        return this.validator.validate(this.wsRepoxDto, repoxJsonFileSchema);
    }

    verifyWsTsconfigDto(): ValidatorResult {
        this.validator.addSchema(tsconfigJsonFileSchema, `/TsconfigJsonFileSchema`);
        return this.validator.validate(this.wsTsconfigDto, tsconfigJsonFileSchema);
    }
}


// todo: refactor the code
