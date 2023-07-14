import { singleton } from "tsyringe";
import { SimpleMessageAppService } from "@lib/logger";
import {
  WorkspaceFileEnum,
  WsDtoStoreService
} from "@lib/repox-workspace";
import { PathUtilsService } from "@lib/utils";

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
    // todo: Create verification of configuration files
    return true;
  }

  private notExistPathError(workspaceFile: WorkspaceFileEnum): void {
    this.simpleMessage.writeError("Incorrect workspace structure");
    this.simpleMessage.writeError(
      `The ${workspaceFile} file does not exist`
    );
  }
}

// todo: refactor
