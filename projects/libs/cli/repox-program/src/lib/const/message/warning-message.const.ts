import { type SystemProgramEnum } from "../../enum/system-program/system-program.enum";

/**
 * All warning messages for that project.
 */

export const specifyArgumentAndRunAgainWarningMsg = (arg: string, alias: string, type: string): string =>
    `Specify the argument --${arg} or alias -${alias} with a ${type} value type and run the command again.`;

export const installSystemProgramAndRunAgainWarningMsg = (systemProgram: SystemProgramEnum): string =>
    `Install ${systemProgram} and run the command again.`;

export const visitSystemProgramPageWarningMsg = (systemProgram: SystemProgramEnum, url: string): string =>
    `For more information about ${systemProgram} visit: ${url}`;

export const navigateToTheExistingWorkspaceFolderWarningMsg = (): string =>
    "Navigate to your existing workspace folder and run the command again.";

export const repairConfigurationAndRunAgainWarningMsg = (): string =>
    "Repair the workspace configuration and run the command again.";

export const specifiedFolderThatExistOnDiskWarningMsg = (): string =>
    "You specified the name of a folder that already exists on disk.";

export const specifyDifferentFolderNameWarningMsg = (): string =>
    "Specify a different folder name and run the program again.";

export const specifyArgumentCorrectlyWarningMsg = (arg: string): string =>
    `Specify the --${arg} argument correctly and run the program again.`;

export const pathNotExistWarningMsg = (path: string): string =>
    `The ${path} path does not exist`;

export const specifyDifferentProjectNameWarningMsg = (): string =>
    "Specify a different project name and run the program again.";
