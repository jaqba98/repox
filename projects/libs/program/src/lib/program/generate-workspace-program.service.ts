import { singleton } from "tsyringe";
import { ParamDomainModel } from "@lib/param-domain";

@singleton()
/**
 * The start point of the generate workspace program.
 */
export class GenerateWorkspaceProgramService {
  run(paramDomain: ParamDomainModel): void {
  }
}
// todo: refactor
