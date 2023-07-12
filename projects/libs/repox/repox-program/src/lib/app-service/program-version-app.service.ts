import { singleton } from "tsyringe";
import { SimpleMessageAppService } from "@lib/logger";
import { REPOX_VERSION } from "@lib/repox-const";

@singleton()
/**
 * The app service is responsible for manage a program version.
 */
export class ProgramVersionAppService {
  constructor(
    private readonly simpleMessage: SimpleMessageAppService
  ) {
  }

  showProgramVersion(): void {
    this.simpleMessage.writeInfo(REPOX_VERSION);
  }
}
// todo: refactor
