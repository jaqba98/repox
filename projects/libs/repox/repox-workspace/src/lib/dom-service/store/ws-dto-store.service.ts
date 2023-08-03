import { singleton } from "tsyringe";
import { FileUtilsService } from "@lib/utils";
import {
  WorkspaceFileEnum
} from "../../enum/workspace/workspace-file.enum";
import { Validator, type ValidatorResult } from "jsonschema";
import {
  repoxJsonFileSchema,
  tsconfigJsonFileSchema
} from "../../const/schema.const";
import {
  type WsRepoxDtoModel,
  type WsRepoxProjectDtoModel
} from "../../model/ws-dto/ws-repox-dto.model";
import {
  type WsTsconfigDtoModel
} from "../../model/ws-dto/ws-tsconfig-dto.model";
import { EMPTY_STRING } from "@lib/const";
import {
  type WsProjectDomainModel
} from "../../model/ws-domain/ws-domain.model";

@singleton()
/**
 * The dto store service is responsible for store all
 * configuration file content directly from files.
 */
export class WsDtoStoreService {
  private wsRepoxDto: WsRepoxDtoModel | undefined;
  private wsTsconfigDto: WsTsconfigDtoModel | undefined;

  constructor (
    private readonly file: FileUtilsService,
    private readonly validator: Validator
  ) {
  }

  loadWsDto (): void {
    this.wsRepoxDto = this.file.readJsonFile<WsRepoxDtoModel>(
      WorkspaceFileEnum.repoxJson
    );
    this.wsTsconfigDto = this.file.readJsonFile<WsTsconfigDtoModel>(
      WorkspaceFileEnum.tsconfigJson
    );
  }

  saveWsDto (): void {
    if (this.wsRepoxDto === undefined) {
      throw new Error("The repox store is undefined!");
    }
    if (this.wsTsconfigDto === undefined) {
      throw new Error("The tsconfig store is undefined!");
    }
    this.file.writeJsonFile<WsRepoxDtoModel>(
      WorkspaceFileEnum.repoxJson, this.wsRepoxDto
    );
    this.file.writeJsonFile<WsTsconfigDtoModel>(
      WorkspaceFileEnum.tsconfigJson, this.wsTsconfigDto
    );
  }

  getWsRepoxDto (): WsRepoxDtoModel {
    if (this.wsRepoxDto === undefined) {
      throw new Error("The store is undefined!");
    }
    return this.wsRepoxDto;
  }

  getWsTsconfigDto (): WsTsconfigDtoModel {
    if (this.wsTsconfigDto === undefined) {
      throw new Error("The store is undefined!");
    }
    return this.wsTsconfigDto;
  }

  getWsRepoxDtoProjects (): WsRepoxProjectDtoModel[] {
    const { projects } = this.getWsRepoxDto();
    if (projects === undefined) {
      throw new Error("The projects in store is undefined!");
    }
    return Object.values(projects);
  }

  addProjectDto (project: WsProjectDomainModel): void {
    if (this.wsRepoxDto === undefined) {
      throw new Error("The repox store is undefined!");
    }
    if (this.wsRepoxDto.projects === undefined) {
      throw new Error("The projects in repox store is undefined!");
    }
    if (this.wsTsconfigDto === undefined) {
      throw new Error("The tsconfig store is undefined!");
    }
    this.wsRepoxDto.projects[project.name] = {
      name: project.name === EMPTY_STRING ? undefined : project.name,
      type: project.type,
      path: project.path === EMPTY_STRING ? undefined : project.path,
      scheme: project.scheme,
      build: {
        output: project.build.output === EMPTY_STRING
          ? undefined
          : project.build.output,
        main: project.build.main === EMPTY_STRING
          ? undefined
          : project.build.main,
        assets: project.build.assets.length === 0
          ? undefined
          : project.build.assets
      }
    };
    if (project.alias === EMPTY_STRING) return;
    this.wsTsconfigDto.compilerOptions
      .paths[project.alias] = project.indexPath;
  }

  getProjectIndexPath (
    projectAlias: string, projectType: string | undefined
  ): string[] {
    if (projectType === EMPTY_STRING || projectType === undefined) {
      return [];
    }
    const tsconfigDto = this.getWsTsconfigDto();
    const indexPath = tsconfigDto.compilerOptions.paths[projectAlias];
    return indexPath || [];
  }

  verifyWsRepoxDto (): ValidatorResult {
    this.validator.addSchema(
      repoxJsonFileSchema, "/RepoxJsonFileSchema"
    );
    return this.validator.validate(
      this.wsRepoxDto, repoxJsonFileSchema
    );
  }

  verifyWsTsconfigDto (): ValidatorResult {
    this.validator.addSchema(
      tsconfigJsonFileSchema, "/TsconfigJsonFileSchema"
    );
    return this.validator.validate(
      this.wsTsconfigDto, tsconfigJsonFileSchema
    );
  }
}
