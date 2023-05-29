import { singleton } from "tsyringe";
import { execSync } from "child_process";
import { SimpleMessageAppService } from "@lib/logger";

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
    this.simpleMessage.writePlain(`Run the command: ${cmd}`, 0);
    execSync(cmd);
  }
}
