import { singleton } from "tsyringe";
import { PathUtilsService, SystemUtilsService } from "@lib/utils";
import { SimpleMessageAppService } from "@lib/logger";
import { ProgramSystemEnum } from "../enum/program-system.enum";
import { REPOX_LOGO } from "@lib/repox-const";

@singleton()
/**
 * The service is responsible for verify system.
 */
export class SystemVerificationAppService {
  constructor(
    private readonly simpleMessage: SimpleMessageAppService,
    private readonly pathUtils: PathUtilsService,
    private readonly systemUtils: SystemUtilsService
  ) {
  }

  run(): boolean {
    // System verification
    for (const system of Object.values(ProgramSystemEnum)) {
      if (!this.systemUtils.checkProgramExist(system)) {
        this.writeSystemVerificationError(system);
        return false;
      }
    }
    return true;
  }

  private writeSystemVerificationError(program: string): void {
    this.simpleMessage.writeError(
      `The ${program} is not installed`, REPOX_LOGO
    );
    this.simpleMessage.writeWarning(
      `Install ${program} on the computer`, REPOX_LOGO
    );
  }
}
// todo: refactor
