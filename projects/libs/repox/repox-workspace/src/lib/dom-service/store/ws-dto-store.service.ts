import { singleton } from "tsyringe";
import {
  WsRepoxDtoModel
} from "../../model/ws-file-dto/ws-repox-dto.model";
import {
  WsTsconfigDtoModel
} from "../../model/ws-file-dto/ws-tsconfig-dto.model";
import { FileUtilsService } from "@lib/utils";
import {
  WorkspaceFileEnum
} from "../../enum/workspace/workspace-file.enum";
import { Validator, ValidatorResult } from "jsonschema";
import {
  repoxJsonFileSchema,
  tsconfigJsonFileSchema
} from "../../const/schema.const";

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
