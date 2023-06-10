import { singleton } from "tsyringe";
import { SimpleMessageAppService } from "projects/libs/logger/src";
import { execSync } from "child_process";

@singleton()
/**
 * The service is responsible for run bash command.
 */
export class RunCommandService {
  constructor(
    private readonly simpleMessage: SimpleMessageAppService
  ) {
  }

  exec(cmd: string): void {
    this.simpleMessage.writePlain(`Run the ${cmd} command`, 0);
    execSync(cmd);
  }
}
