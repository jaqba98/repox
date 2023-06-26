import { singleton } from "tsyringe";
import { PathUtilsService } from "@lib/utils";
import { ConfigFileEnum } from "../enum/config/config-file.enum";

@singleton()
/**
 * The app service is responsible for managing the workspace.
 */
export class WorkspaceAppService {
  constructor(private readonly pathUtils: PathUtilsService) {
  }

  checkFilesExist(): boolean {
    if (this.pathUtils.notExistPath(ConfigFileEnum.domainJson)) {
      return false;
    }
    if (this.pathUtils.notExistPath(ConfigFileEnum.tsconfigJson)) {
      return false;
    }
    return true;
  }
}
