import { singleton } from "tsyringe";
import { SimpleMessageAppService } from "@lib/logger";
import {
  WorkspaceFileEnum,
  WsDtoStoreService
} from "@lib/repox-workspace";
import { PathUtilsService } from "@lib/utils";
import { ValidationError } from "jsonschema";

@singleton()
/**
 * The app service is responsible for load all workspace
 * configuration.
 */
export class LoadWsConfigAppService {
  constructor(
    private readonly simpleMessage: SimpleMessageAppService,
    private readonly path: PathUtilsService,
    private readonly wsDtoStore: WsDtoStoreService
  ) {
  }

  run(): boolean {
    this.simpleMessage.writePlain("Load workspace configuration");
    if (this.path.notExistPath(WorkspaceFileEnum.repoxJsonFile)) {
      this.notExistPathError(WorkspaceFileEnum.repoxJsonFile);
      return false;
    }
    if (this.path.notExistPath(WorkspaceFileEnum.tsconfigJsonFile)) {
      this.notExistPathError(WorkspaceFileEnum.tsconfigJsonFile);
      return false;
    }
    this.wsDtoStore.loadWsDto();
    const wsRepoxDtoVerifyResult = this.wsDtoStore.verifyWsRepoxDto();
    if (wsRepoxDtoVerifyResult.errors.length > 0) {
      this.verifyErrorError(
        WorkspaceFileEnum.repoxJsonFile, wsRepoxDtoVerifyResult.errors
      );
      return false;
    }
    const wsTsconfigDtoVerifyResult = this.wsDtoStore
      .verifyWsTsconfigDto();
    if (wsTsconfigDtoVerifyResult.errors.length > 0) {
      this.verifyErrorError(
        WorkspaceFileEnum.tsconfigJsonFile,
        wsTsconfigDtoVerifyResult.errors
      );
      return false;
    }
    return true;
  }

  private notExistPathError(workspaceFile: WorkspaceFileEnum): void {
    this.simpleMessage.writeError("Incorrect workspace structure");
    this.simpleMessage.writeError(
      `The ${workspaceFile} file does not exist`
    );
  }

  private verifyErrorError(
    workspaceFile: WorkspaceFileEnum, errors: Array<ValidationError>
  ): void {
    this.simpleMessage.writeError(
      `Incorrect content of ${workspaceFile} file`
    );
    errors.forEach(error => {
      this.simpleMessage.writeError(error.toString());
    });
  }
}

// todo: refactor
