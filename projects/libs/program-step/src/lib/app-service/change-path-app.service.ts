import { singleton } from "tsyringe";
import { PathUtilsService } from "@lib/utils";
import { SimpleMessageAppService } from "@lib/logger";

@singleton()
/**
 * The service is responsible for change path.
 */
export class ChangePathAppService {
  constructor (
    private readonly simpleMessage: SimpleMessageAppService,
    private readonly pathUtils: PathUtilsService
  ) {
  }

  run (path: string): boolean {
    this.simpleMessage.writePlain(`Change path`);
    this.pathUtils.changePath(path);
    return true;
  }
}
