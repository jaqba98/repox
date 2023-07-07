import { singleton } from "tsyringe";
import { ParamDomainAppService } from "@lib/param-domain";
import { LauncherModel } from "../model/launcher.model";

@singleton()
/**
 * The app service is responsible for select service to run
 * by given program name and command name.
 */
export class LauncherAppService {
  constructor(private readonly paramDomain: ParamDomainAppService) {
  }

  launchProgram(launcher: LauncherModel): void {
    const programName = this.paramDomain.getProgramName();
    const commandName = this.paramDomain.getCommandName();
    const programToRun = launcher.programs.find(program =>
      program.programName === programName &&
      program.commandName === commandName
    );
    if (programToRun) {
      programToRun.service.runProgram();
    }
    throw new Error("Not found implementation for given program!");
  }
}
