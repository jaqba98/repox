import { singleton } from "tsyringe";
import { PathUtilsService } from "@lib/utils";
import { SimpleMessageAppService } from "@lib/logger";
import { EMPTY_STRING } from "@lib/const";

@singleton()
/**
 * The service is responsible for go to project root path.
 */
export class GoToProjectRootAppService {
  constructor(
    private readonly simpleMessage: SimpleMessageAppService,
    private readonly pathUtils: PathUtilsService
  ) {
  }

  run(): boolean {
    this.simpleMessage.writePlain("Go to project root");
    const currentPath = this.pathUtils.getCurrentPath();
    const packageJsonPath = this.pathUtils.getPackageJsonPath(
      currentPath
    );
    if (packageJsonPath === EMPTY_STRING) {
      this.simpleMessage.writeError(
        "Repox workspace root path not found"
      );
      this.simpleMessage.writeWarning(
        "Run the command in the repox workspace directory"
      );
      return false;
    }
    this.pathUtils.changePath(packageJsonPath);
    return true;
  }
}