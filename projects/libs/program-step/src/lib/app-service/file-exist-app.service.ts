import { singleton } from "tsyringe";
import { SimpleMessageAppService } from "@lib/logger";
import { PathUtilsService } from "@lib/utils";

@singleton()
/**
 * The app service is responsible for checking whether the
 * file exist.
 */
export class FileExistAppService {
  constructor(
    private readonly simpleMessage: SimpleMessageAppService,
    private readonly pathUtils: PathUtilsService
  ) {
  }

  run(filePath: string): boolean {
    this.simpleMessage.writePlain(
      `Checking if ${filePath} file exist`
    );
    if (this.pathUtils.existPath(filePath)) {
      return true;
    }
    this.simpleMessage.writeError(
      `The ${filePath} file not exist`
    );
    return false;
  }
}
