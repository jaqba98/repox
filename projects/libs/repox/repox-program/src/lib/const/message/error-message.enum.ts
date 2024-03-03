/**
 * All error messages for that project.
 */

export const programNotExistErrorMsg = (program: string) =>
    `The ${program} program does not exist!`;

export const commandNotExistErrorMsg = (program: string, command: string) =>
    `The ${command} command does not exist for ${program} program!`;

export const failedToCreateFolderErrorMsg = (folderName: string) =>
    `Failed to create a folder named ${folderName}!`;

export const folderAlreadyExistErrorMsg = (folderName: string) =>
    `The ${folderName} folder already exist!`;

export const argumentIsNotSpecifiedErrorMsg = (arg: string) =>
    `The ${arg} argument is not specified!`;

export const argumentIsNotHaveSingleValueErrorMsg = (arg: string) =>
    `The ${arg} argument does not have a single value!`;

export const systemProgramNotExistInSystemErrorMsg = (systemProgram: string) =>
    `The ${systemProgram} program does not exist in the system!`;
