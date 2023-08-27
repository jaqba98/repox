import { singleton } from "tsyringe";
import {
  NewlineAppService,
  SimpleMessageAppService
} from "@lib/logger";
import {
  GetSystemProgramUrlService
} from "../dom-service/get-system-program-url.service";
import { type SystemProgramEnum } from "../enum/system-program.enum";
import {
  SystemProgramExistService
} from "../infrastructure/system-program-exist.service";

@singleton()
/**
 * The app service is responsible for checking whether
 * the system program exist.
 */
export class SystemProgramExistAppService {
  constructor (
    private readonly simpleMessage: SimpleMessageAppService,
    private readonly systemProgramExist: SystemProgramExistService,
    private readonly getSystemProgramUrl: GetSystemProgramUrlService,
    private readonly newline: NewlineAppService
  ) {
  }

  run (programName: SystemProgramEnum): boolean {
    this.simpleMessage.writePlain(
      `Step: System Program Exist >>> ${programName}`
    );
    if (this.systemProgramExist.checkExist(programName)) {
      return true;
    }
    this.newline.writeNewline();
    const url = this.getSystemProgramUrl.getUrl(programName);
    this.simpleMessage.writeError(
      `The ${programName} program does not exist on the system`
    );
    this.simpleMessage.writeWarning(
      `To resolve this issue, follow these steps:`
    );
    this.simpleMessage.writeWarning(`1) Go to ${url} website`);
    this.simpleMessage.writeWarning(
      `2) Download and then install the program on your system`
    );
    return false;
  }
}
