import { singleton } from "tsyringe";
import { SimpleMessageAppService } from "@lib/logger";
import { PathUtilsService } from "@lib/utils";
import { ConfigFileEnum } from "@lib/repox-workspace";

@singleton()
/**
 * The app service is responsible for checking whether
 * the given folder is a correct workspace.
 */
export class CheckWorkspaceAppService {
  constructor(
    private readonly simple: SimpleMessageAppService,
    private readonly pathUtils: PathUtilsService
  ) {
  }

  run(): boolean {
    if (this.pathUtils.notExistPath(ConfigFileEnum.domainJson)) {
      this.writeConfigExistError(ConfigFileEnum.domainJson);
      return false;
    }
    if (this.pathUtils.notExistPath(ConfigFileEnum.tsconfigJson)) {
      this.writeConfigExistError(ConfigFileEnum.tsconfigJson);
      return false;
    }
    return true;
  }

  private writeConfigExistError(configFile: ConfigFileEnum): void {
    this.simple.writeError(`Not exist ${configFile} config file!`);
  }
}

// todo: refactor