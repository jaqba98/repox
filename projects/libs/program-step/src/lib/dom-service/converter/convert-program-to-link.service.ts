import { singleton } from "tsyringe";
import { ProgramSystemEnum } from "../../enum/program-system.enum";

@singleton()
/**
 * The service is responsible for convert program system name
 * to url link.
 */
export class ConvertProgramToLinkService {
  convert (programSystem: ProgramSystemEnum): string {
    switch (programSystem) {
      case ProgramSystemEnum.git:
        return `https://git-scm.com/`;
      case ProgramSystemEnum.node:
      case ProgramSystemEnum.npm:
        return `https://nodejs.org/`;
      default:
        throw new Error(`No link found for this program`);
    }
  }
}
// todo: refactor the file
