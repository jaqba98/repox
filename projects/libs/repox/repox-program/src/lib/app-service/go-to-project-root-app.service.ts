import { singleton } from "tsyringe";
import { PathUtilsService } from "@lib/utils";

@singleton()
/**
 * The service is responsible for go to project root path.
 */
export class GoToProjectRootAppService {
  constructor(private readonly pathUtils: PathUtilsService) {
  }

  run(): boolean {
    const currentPath = this.pathUtils.getCurrentPath();
    const packageJsonPath = this.pathUtils.getPackageJsonPath(
      currentPath
    );
    console.log(packageJsonPath);
    return true;
  }
}

// todo: refactor
