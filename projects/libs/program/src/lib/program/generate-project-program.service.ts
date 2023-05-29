import { singleton } from "tsyringe";
import { ParamDomainModel } from "@lib/param-domain";

@singleton()
/**
 * The start point of the generate project program.
 */
export class GenerateProjectProgramService {
  run(paramDomain: ParamDomainModel): void {
  }
}
// todo: refactor
