import { singleton } from "tsyringe";
import { FileUtilsService } from "@lib/utils";
import {
  WorkspaceFileEnum
} from "../../enum/workspace/workspace-file.enum";
import { Validator, ValidatorResult } from "jsonschema";
import {
  repoxJsonFileSchema,
  tsconfigJsonFileSchema
} from "../../const/schema.const";
import {
  WsRepoxDtoModel,
  WsRepoxProjectBuildDtoModel
} from "../../model/ws-dto/ws-repox-dto.model";
import {
  WsTsconfigDtoModel
} from "../../model/ws-dto/ws-tsconfig-dto.model";
import {
  ProjectTypeEnum
} from "../../enum/project/project-type.enum";
import {
  ProjectSchemeEnum
} from "../../enum/project/project-scheme.enum";
import { EMPTY_STRING } from "@lib/const";

@singleton()
/**
 * The dto store service is responsible for store all
 * configuration file content directly from files.
 */
export class WsDtoStoreService {
  private wsRepoxDto: WsRepoxDtoModel | undefined;
  private wsTsconfigDto: WsTsconfigDtoModel | undefined;

  constructor(
    private readonly file: FileUtilsService,
    private readonly validator: Validator
  ) {
  }

  loadWsDto(): void {
    this.wsRepoxDto = this.file.readJsonFile<WsRepoxDtoModel>(
      WorkspaceFileEnum.repoxJsonFile
    );
    this.wsTsconfigDto = this.file.readJsonFile<WsTsconfigDtoModel>(
      WorkspaceFileEnum.tsconfigJsonFile
    );
  }

  saveWsDto(): void {
    this.file.writeJsonFile<WsRepoxDtoModel>(
      WorkspaceFileEnum.repoxJsonFile, this.getWsRepoxDto()
    );
    this.file.writeJsonFile<WsTsconfigDtoModel>(
      WorkspaceFileEnum.tsconfigJsonFile, this.getWsTsconfigDto()
    );
  }

  getWsRepoxDto(): WsRepoxDtoModel {
    if (this.wsRepoxDto === undefined) {
      throw new Error("The store is undefined!");
    }
    return this.wsRepoxDto;
  }

  getWsTsconfigDto(): WsTsconfigDtoModel {
    if (this.wsTsconfigDto === undefined) {
      throw new Error("The store is undefined!");
    }
    return this.wsTsconfigDto;
  }

  addProjectDto(
    projectName: string, projectType: ProjectTypeEnum,
    projectPath: string, projectScheme: ProjectSchemeEnum,
    projectBuild: WsRepoxProjectBuildDtoModel, alias: string,
    indexPath: Array<string>
  ): void {
    if (this.wsRepoxDto === undefined) {
      throw new Error("The store is undefined!");
    }
    if (this.wsTsconfigDto === undefined) {
      throw new Error("The store is undefined!");
    }
    const { output, main, assets } = projectBuild;
    this.wsRepoxDto.projects[projectName] = {
      name: projectName,
      type: projectType,
      path: projectPath,
      scheme: projectScheme,
      build: {
        output: output,
        main: main,
        assets: assets
      }
    };
    this.wsTsconfigDto.compilerOptions.paths[alias] = indexPath;
  }

  getProjectIndexPath(projectAlias: string): Array<string> {
    const tsconfigDto = this.getWsTsconfigDto();
    const indexPath = tsconfigDto.compilerOptions.paths[projectAlias];
    return indexPath ? indexPath : [];
  }

  verifyWsRepoxDto(): ValidatorResult {
    this.validator.addSchema(
      repoxJsonFileSchema, "/RepoxJsonFileSchema"
    );
    return this.validator.validate(
      this.wsRepoxDto, repoxJsonFileSchema
    );
  }

  verifyWsTsconfigDto(): ValidatorResult {
    this.validator.addSchema(
      tsconfigJsonFileSchema, "/TsconfigJsonFileSchema"
    );
    return this.validator.validate(
      this.wsTsconfigDto, tsconfigJsonFileSchema
    );
  }
}
