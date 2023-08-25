import { singleton } from "tsyringe";
import { RunCommandUtilsService } from "@lib/utils";
import { SimpleMessageAppService } from "@lib/logger";

@singleton()
/**
 * The service is responsible for run command npm publish.
 */
export class NpmPublishAppService {
  constructor (
    private readonly simpleMessage: SimpleMessageAppService,
    private readonly runCommandUtils: RunCommandUtilsService
  ) {
  }

  run (): boolean {
    this.simpleMessage.writePlain(`Npm publish`);
    this.runCommandUtils.runCommand(`npm publish`, true);
    return true;
  }
}
// todo: refactor the file
