import { singleton } from "tsyringe";
import { sync } from "command-exists";
import { SimpleMessageAppService } from "@lib/logger";

@singleton()
/**
 * The service is responsible for verify whether program
 * is installed.
 */
export class ProgramInstalledService {
  constructor(
    private readonly simpleMessage: SimpleMessageAppService
  ) {
  }

  check(program: string): boolean {
    if (sync(program)) return true;
    this.simpleMessage.writeError(
      `Program ${program} is not installed on the system!`, 0, false,
      true
    );
    this.simpleMessage.writeWarning(
      `You have to install ${program} on your device`, 0, false, true
    );
    return false;
  }
}
