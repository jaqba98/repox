import { singleton } from "tsyringe";
import { SimpleMessageAppService } from "@lib/logger";
import { PathUtilsService } from "@lib/utils";

@singleton()
/**
 * The app service is responsible for checking whether the
 * folder exist.
 */
export class FolderExistAppService {
  constructor(
    private readonly simpleMessage: SimpleMessageAppService,
    private readonly pathUtils: PathUtilsService
  ) {
  }

  run(folderPath: string): boolean {
    this.simpleMessage.writePlain(
      `Checking if ${folderPath} folder exist`
    );
    if (this.pathUtils.existPath(folderPath)) {
      return true;
    }
    this.simpleMessage.writeError(
      `The ${folderPath} folder not exist`
    );
    return false;
  }
}
