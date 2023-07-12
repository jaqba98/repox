import { singleton } from "tsyringe";
import { PathUtilsService } from "@lib/utils";
import { SimpleMessageAppService } from "@lib/logger";
import { REPOX_LOGO } from "@lib/repox-const";
import { path } from "app-root-path";

@singleton()
/**
 * The service is responsible for go to root of project.
 */
export class GoToRootProjectAppService {
  constructor(
    private readonly simpleMessage: SimpleMessageAppService,
    private readonly pathUtils: PathUtilsService
  ) {
  }

  run(): boolean {
    // Go to the root project path.
    if (this.pathUtils.notExistPath(path)) {
      this.writeGoToRootProjectPathError();
      return false;
    }
    this.pathUtils.changePath(path);
    return true;
  }

  private writeGoToRootProjectPathError(): void {
    this.simpleMessage.writeError(
      `The path ${path} does not exist!`, REPOX_LOGO
    );
  }
}
// todo: refactor
