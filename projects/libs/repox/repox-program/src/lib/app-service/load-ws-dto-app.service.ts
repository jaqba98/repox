import { singleton } from "tsyringe";
import { SimpleMessageAppService } from "@lib/logger";
import { PathUtilsService } from "@lib/utils";
import {
  WorkspaceFileEnum,
  WsDtoStoreService
} from "@lib/repox-workspace";

@singleton()
/**
 * The app service is responsible for load workspace dto model
 * and verify it.
 */
export class LoadWsDtoAppService {
  constructor (
    private readonly simpleMessage: SimpleMessageAppService,
    private readonly pathUtils: PathUtilsService,
    private readonly wsDtoStore: WsDtoStoreService
  ) {
  }

  run (): boolean {
    this.simpleMessage.writePlain("Load workspace dto model");
    // Check if workspace files exist
    if (this.pathUtils.notExistPath(WorkspaceFileEnum.repoxJson)) {
      this.simpleMessage.writeError("Incorrect workspace structure");
      this.simpleMessage.writeError(
        `The ${WorkspaceFileEnum.repoxJson} file does not exist`
      );
      return false;
    }
    if (this.pathUtils.notExistPath(WorkspaceFileEnum.tsconfigJson)) {
      this.simpleMessage.writeError("Incorrect workspace structure");
      this.simpleMessage.writeError(
        `The ${WorkspaceFileEnum.tsconfigJson} file does not exist`
      );
      return false;
    }
    // Load the workspace dto model
    this.wsDtoStore.loadWsDto();
    return true;
  }
}
