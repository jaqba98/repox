import { singleton } from "tsyringe";
import { SimpleMessageAppService } from "@lib/logger";

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
    this.simpleMessage.writeInfo("1.0.0");
  }
}
// todo: refactor
