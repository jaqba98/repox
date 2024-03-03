/**
 * All step messages for that project.
 */
import {SystemProgramEnum} from "../../enum/system-program/system-program.enum";

export const getCommandArgSingleValueMsg = (arg: string): string =>
    `Get command arg single value: --${arg}`;

export const systemProgramExistMsg = (systemProgram: SystemProgramEnum) =>
    `System program exist: ${systemProgram}`;

export const folderNotExistMsg = (folderPath: string) => `Folder not exist: ${folderPath}`;

export const createFolderMsg = (folderPath: string) => `Create folder: ${folderPath}`;
