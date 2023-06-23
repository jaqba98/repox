import { singleton } from "tsyringe";
import { path } from "app-root-path";
import { PathUtilsService, SystemUtilsService } from "@lib/utils";
import { SimpleMessageAppService } from "@lib/logger";
import { REPOX_LOGO } from "@lib/const";
import { ProgramSystemEnum } from "../enum/program-system.enum";

@singleton()
/**
 * The service is responsible for run all actions
 * before run program.
 */
export class PreRunAppService {
  constructor(
    private readonly simpleMessage: SimpleMessageAppService,
    private readonly pathUtils: PathUtilsService,
    private readonly systemUtils: SystemUtilsService,
  ) {
  }

  run(): boolean {
    // System verification
    if (!this.systemUtils.checkProgramExist(ProgramSystemEnum.git)) {
      this.writeSystemVerificationError(ProgramSystemEnum.git);
      return false;
    }
    if (!this.systemUtils.checkProgramExist(ProgramSystemEnum.node)) {
      this.writeSystemVerificationError(ProgramSystemEnum.node);
      return false;
    }
    if (!this.systemUtils.checkProgramExist(ProgramSystemEnum.npm)) {
      this.writeSystemVerificationError(ProgramSystemEnum.npm);
      return false;
    }
    // Go to the root project path.
    if (this.pathUtils.notExistPath(path)) {
      this.writeGoToRootProjectPathError();
      return false;
    }
    this.pathUtils.changePath(path);
    return true;
  }

  private writeSystemVerificationError(
    program: ProgramSystemEnum
  ): void {
    this.simpleMessage.writeError(
      `The ${program} is not installed`, REPOX_LOGO
    );
    this.simpleMessage.writeWarning(
      `Install ${program} on the computer`, REPOX_LOGO
    );
  }

  private writeGoToRootProjectPathError(): void {
    this.simpleMessage.writeError(
      `The path ${path} does not exist!`, REPOX_LOGO
    );
  }
}
