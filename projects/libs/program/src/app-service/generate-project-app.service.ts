import { singleton } from "tsyringe";
import { ParamDomainModel } from "@lib/parameter";

@singleton()
/**
 * The program service is responsible for run program
 * generate project.
 */
export class GenerateProjectAppService {
  run(paramDomain: ParamDomainModel): void {
  }
}
// todo: refactor