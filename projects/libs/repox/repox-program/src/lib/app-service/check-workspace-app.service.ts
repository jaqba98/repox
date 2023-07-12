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
    private readonly path: PathUtilsService
  ) {
  }

  run(): boolean {
    if (this.path.notExistPath(ConfigFileEnum.repoxJsonFile)) {
      this.writeConfigExistError(ConfigFileEnum.repoxJsonFile);
      return false;
    }
    if (this.path.notExistPath(ConfigFileEnum.tsconfigJsonFile)) {
      this.writeConfigExistError(ConfigFileEnum.tsconfigJsonFile);
      return false;
    }
    // todo: Create a config content verification
    return true;
  }

  private writeConfigExistError(configFile: ConfigFileEnum): void {
    this.simple.writeError(`Not exist ${configFile} config file!`);
  }
}
// todo: refactor
