import { singleton } from "tsyringe";
import { SimpleMessageAppService } from "@lib/logger";
import {
  WorkspaceFileEnum,
  WsDtoStoreService
} from "@lib/repox-workspace";

@singleton()
/**
 * The app service is responsible for verification
 * workspace dto model.
 */
export class VerificationWsDtoAppService {
  constructor (
    private readonly simpleMessage: SimpleMessageAppService,
    private readonly wsDtoStore: WsDtoStoreService
  ) {
  }

  run (productionMode: boolean): boolean {
    if (productionMode) return true;
    this.simpleMessage.writePlain(`Verification workspace dto model`);
    // Verification the workspace dto model
    const verifyRepoxDto = this.wsDtoStore.verifyWsRepoxDto();
    if (verifyRepoxDto.errors.length > 0) {
      this.simpleMessage.writeError(
        `Incorrect content of ${WorkspaceFileEnum.repoxJsonFile} file`
      );
      verifyRepoxDto.errors.forEach(error => {
        this.simpleMessage.writeError(error.toString());
      });
      return false;
    }
    const verifyTsconfigDto = this.wsDtoStore.verifyWsTsconfigDto();
    if (verifyTsconfigDto.errors.length > 0) {
      this.simpleMessage.writeError(
        `Incorrect content of ${WorkspaceFileEnum.tsconfigJsonFile} file`
      );
      verifyTsconfigDto.errors.forEach(error => {
        this.simpleMessage.writeError(error.toString());
      });
      return false;
    }
    return true;
  }
}
// todo: refactor the file
