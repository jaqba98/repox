import { singleton } from "tsyringe";
import { SimpleMessageAppService } from "@lib/logger";

@singleton()
/**
 * The app service is responsible for display a version.
 */
export class DisplayVersionAppService {
  constructor(
    private readonly simpleMessage: SimpleMessageAppService
  ) {
  }

  displayRepoxVersion(version: string): void {
    this.simpleMessage.writeInfo(version);
  }
}
