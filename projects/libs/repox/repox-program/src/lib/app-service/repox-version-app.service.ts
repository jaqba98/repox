import { singleton } from "tsyringe";
import { SimpleMessageAppService } from "@lib/logger";
import { REPOX_VERSION } from "@lib/repox-const";

@singleton()
/**
 * The app service is responsible for manage a repox version.
 */
export class RepoxVersionAppService {
  constructor(
    private readonly simpleMessage: SimpleMessageAppService
  ) {
  }

  displayRepoxVersion(): void {
    this.simpleMessage.writeInfo(REPOX_VERSION);
  }
}
