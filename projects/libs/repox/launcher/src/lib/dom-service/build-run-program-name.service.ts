import { singleton } from "tsyringe";
import { GetDomainDataAppService } from "@lib/param-domain";

@singleton()
/**
 * The service is responsible for build run program by
 * program name and command name.
 */
export class BuildRunProgramNameService {
  constructor(
    private readonly getDomainDataApp: GetDomainDataAppService
  ) {
  }

  getProgramName(): string {
    const programName = this.getDomainDataApp.getProgramName();
    const commandName = this.getDomainDataApp.getCommandName();
    return `${programName}-${commandName}`;
  }
}
// todo: refactor
