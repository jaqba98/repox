/**
 * All step messages for that project.
 */

export const createFolderStepMsg = (folderName: string) => `Create folder: ${folderName}`;

export const folderNotExistStepMsg = (folderName: string) =>
    `Folder not exist: ${folderName}`;

export const getSingleCommandArgValueStepMsg = (arg: string) =>
    `Get a single command argument value: ${arg}`;

export const systemProgramExistStepMsg = (systemProgram: string) =>
    `System program exist: ${systemProgram}`;

export const changePathStepMsg = (path: string) => `Change path: ${path}`;
