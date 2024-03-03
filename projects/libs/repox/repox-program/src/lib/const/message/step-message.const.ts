/**
 * All step messages for that project.
 */
import {SystemProgramEnum} from "../../enum/system-program/system-program.enum";

export const getCommandArgSingleValue = (arg: string): string =>
    `Get command arg single value: --${arg}`;

export const systemProgramExist = (systemProgram: SystemProgramEnum) =>
    `System program exist: ${systemProgram}`;

export const folderNotExist = (folderPath: string) => `Folder not exist: ${folderPath}`;
