import { singleton } from "tsyringe";
import {
  NewlineAppService,
  SimpleMessageAppService
} from "@lib/logger";

@singleton()
/**
 * The app service is responsible for checking whether
 * the force mode is set.
 */
export class CheckForceModeAppService {
  constructor (
    private readonly simpleMessage: SimpleMessageAppService,
    private readonly newline: NewlineAppService
  ) {
  }

  run (isForceMode: boolean): boolean {
    this.simpleMessage.writePlain(
      `Step: Check Force Mode >>> ${isForceMode}`
    );
    if (isForceMode) {
      return true;
    }
    this.newline.writeNewline();
    this.simpleMessage.writeError(
      `The command requires force mode to run.`
    );
    this.simpleMessage.writeWarning(
      `Run the command with --force flag`
    );
    return false;
  }
}
