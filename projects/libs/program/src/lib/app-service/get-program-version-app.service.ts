import { singleton } from "tsyringe";
import { SimpleMessageAppService } from "@lib/logger";
import { SYSTEM_VERSION } from "@lib/const";

@singleton()
/**
 * The app service is responsible for display current version.
 */
export class GetProgramVersionAppService {
  constructor(
    private readonly simpleMessage: SimpleMessageAppService
  ) {
  }

  getProgramVersion(): void {
    this.simpleMessage.writeInfo(
      SYSTEM_VERSION, 0, false, true, "VERSION"
    );
  }
}
