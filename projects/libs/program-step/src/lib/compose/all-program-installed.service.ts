import { singleton } from "tsyringe";
import {
  ProgramInstalledAppService
} from "../app-service/program-installed-app.service";
import { ProgramSystemEnum } from "../enum/program-system.enum";

@singleton()
/**
 * The compose service is responsible for checking
 * whether all program are installed.
 */
export class AllProgramInstalledService {
  constructor(
    private readonly programInstalled: ProgramInstalledAppService
  ) {
  }

  run(): boolean {
    if (!this.programInstalled.run(ProgramSystemEnum.git)) {
      return false;
    }
    if (!this.programInstalled.run(ProgramSystemEnum.node)) {
      return false;
    }
    if (!this.programInstalled.run(ProgramSystemEnum.npm)) {
      return false;
    }
    return true;
  }
}
