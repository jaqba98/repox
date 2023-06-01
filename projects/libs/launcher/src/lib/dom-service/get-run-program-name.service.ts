import { singleton } from "tsyringe";
import { ParamDomainModel } from "@lib/param-domain";

@singleton()
/**
 * The service is responsible for get program to run by
 * program name and command name.
 */
export class GetRunProgramNameService {
  getProgramName(paramDomain: ParamDomainModel): string {
    return `${paramDomain.program.name}-${paramDomain.command.name}`;
  }
}
// todo: refactor