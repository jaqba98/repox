import { singleton } from "tsyringe";
import { SimpleMessageAppService } from "@lib/logger";
import { PathUtilsService, SystemUtilsService } from "@lib/utils";
import { ProgramSystemEnum } from "../enum/program-system.enum";
import {
  ConvertProgramToLinkService
} from "../dom-service/converter/convert-program-to-link.service";

@singleton()
/**
 * The app service is responsible for checking whether the program
 * is installed on the system.
 */
export class ProgramInstalledAppService {
  constructor(
    private readonly simpleMessage: SimpleMessageAppService,
    private readonly pathUtils: PathUtilsService,
    private readonly systemUtils: SystemUtilsService,
    private readonly convertProgramToLink: ConvertProgramToLinkService
  ) {
  }

  run(programSystem: ProgramSystemEnum): boolean {
    this.simpleMessage.writePlain(
      `Checking if ${programSystem} program is installed`
    );
    if (!this.systemUtils.checkProgramExist(programSystem)) {
      const link = this.convertProgramToLink.convert(programSystem);
      this.simpleMessage.writeError(
        `The ${programSystem} program is not installed`
      );
      this.simpleMessage.writeWarning(
        `Install the program and restart the process, link: ${link}`
      );
      return false;
    }
    return true;
  }
}
