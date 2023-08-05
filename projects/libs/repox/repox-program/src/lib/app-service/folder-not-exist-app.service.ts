import { singleton } from "tsyringe";
import { SimpleMessageAppService } from "@lib/logger";
import { PathUtilsService } from "@lib/utils";

@singleton()
/**
 * The app service is responsible for checking whether the
 * folder name not exist.
 */
export class FolderNotExistAppService {
  constructor (
    private readonly simpleMessage: SimpleMessageAppService,
    private readonly pathUtils: PathUtilsService
  ) {
  }

  run (workspaceName: string): boolean {
    this.simpleMessage.writePlain(
      `Checking if ${workspaceName} folder not exist`
    );
    if (this.pathUtils.notExistPath(workspaceName)) {
      return true;
    }
    this.simpleMessage.writeError(
      `The ${workspaceName} folder already exist`
    );
    this.simpleMessage.writeWarning(`Specify another workspace name`);
    return false;
  }
}
