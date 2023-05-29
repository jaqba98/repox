import { singleton } from "tsyringe";
import { ParamDomainModel } from "@lib/param-domain";

@singleton()
/**
 * The start point of the program default.
 */
export class ProgramDefaultProgramService {
  run(paramDomain: ParamDomainModel): void {
  }
}

// todo: refactor
