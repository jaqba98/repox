import {type ProgramModel} from "@lib/model";

/**
 * The model represents list of run program services
 * for given program and command.
 */

export interface LauncherProgramModel {
    programName: string;
    commandName: string;
    service: ProgramModel;
}

export interface LauncherModel {
    programs: LauncherProgramModel[];
}

// todo: refactor the code
