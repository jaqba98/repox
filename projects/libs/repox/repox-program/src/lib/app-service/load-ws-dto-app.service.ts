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
  constructor(
    private readonly simpleMessage: SimpleMessageAppService,
    private readonly pathUtils: PathUtilsService,
    private readonly wsDtoStore: WsDtoStoreService
  ) {
  }

  run(): boolean {
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
    // Verification the workspace dto model
    const verifyRepoxDto = this.wsDtoStore.verifyWsRepoxDto();
    if (verifyRepoxDto.errors.length > 0) {
      this.simpleMessage.writeError(
        `Incorrect content of ${WorkspaceFileEnum.repoxJson} file`
      );
      verifyRepoxDto.errors.forEach(error => {
        this.simpleMessage.writeError(error.toString());
      });
      return false;
    }
    const verifyTsconfigDto = this.wsDtoStore.verifyWsTsconfigDto();
    if (verifyTsconfigDto.errors.length > 0) {
      this.simpleMessage.writeError(
        `Incorrect content of ${WorkspaceFileEnum.tsconfigJson} file`
      );
      verifyTsconfigDto.errors.forEach(error => {
        this.simpleMessage.writeError(error.toString());
      });
      return false;
    }
    return true;
  }
}
