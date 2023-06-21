import { singleton } from "tsyringe";
import { path } from "app-root-path";
import { PathUtilsService } from "@lib/utils";
import { SimpleMessageAppService } from "@lib/logger";

@singleton()
/**
 * The service is responsible for run all actions
 * before run program.
 */
export class PreRunAppService {
  constructor(
    private readonly simpleMessage: SimpleMessageAppService,
    private readonly pathUtils: PathUtilsService
  ) {
  }

  run(): boolean {
    // Go to the root project path.
    if (this.pathUtils.checkNotExist(path)) {
      this.simpleMessage.error(`The path ${path} does not exist!`);
      return false;
    }
    this.pathUtils.changePath(path);
    return true;
  }
}
