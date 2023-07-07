import { RunProgramModel } from "@lib/model";

/**
 * The model represents list of run program services
 * for given program and command.
 */

export interface LauncherProgramModel {
  programName: string;
  commandName: string;
  service: RunProgramModel;
}

export interface LauncherModel {
  programs: Array<LauncherProgramModel>;
}
