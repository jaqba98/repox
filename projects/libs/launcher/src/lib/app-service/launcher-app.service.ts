import { singleton } from "tsyringe";
import { ParamDomainAppService } from "@lib/param-domain";
import { type LauncherModel } from "../model/launcher.model";
import { type RunProgramModel } from "@lib/model";

@singleton()
/**
 * The app service is responsible for select service to run
 * by given program name and command name.
 */
export class LauncherAppService {
  constructor (private readonly paramDomain: ParamDomainAppService) {
  }

  launchProgram (launcher: LauncherModel): RunProgramModel {
    const programName = this.paramDomain.getProgramName();
    const commandName = this.paramDomain.getCommandName();
    const programToRun = launcher.programs.find(program =>
      program.programName === programName &&
      program.commandName === commandName
    );
    if (programToRun === undefined) {
      throw new Error(`Not found implementation for given program!`);
    }
    return programToRun.service;
  }
}
