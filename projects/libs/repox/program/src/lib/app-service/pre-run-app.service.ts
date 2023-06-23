import { singleton } from "tsyringe";
import { path } from "app-root-path";
import { PathUtilsService } from "@lib/utils";
import { SimpleMessageAppService } from "@lib/logger";
import { REPOX_LOGO } from "@lib/const";

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
    if (this.pathUtils.noExistPath(path)) {
      this.simpleMessage.writeError(
        `The path ${path} does not exist!`, REPOX_LOGO
      );
      return false;
    }
    this.pathUtils.changePath(path);
    return true;
  }
}
