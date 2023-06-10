import { singleton } from "tsyringe";
import { SimpleMessageAppService } from "projects/libs/logger/src";
import { SYSTEM_VERSION } from "projects/libs/const/src";

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
