/**
 * All step messages for that project.
 */

export const createFolderStepMsg = (folderName: string) => `Create folder: ${folderName}`;

export const folderNotExistStepMsg = (folderName: string) =>
    `Folder not exist: ${folderName}`;

export const getSingleCommandArgValueStepMsg = (arg: string) =>
    `Get a single command argument value: ${arg}`;

export const getBooleanCommandArgValueStepMsg = (arg: string) =>
    `Get a boolean command argument value: ${arg}`;

export const systemProgramExistStepMsg = (systemProgram: string) =>
    `System program exist: ${systemProgram}`;

export const changePathStepMsg = (path: string) => `Change path: ${path}`;

export const buildWorkspaceDtoStepMsg = () => "Build workspace dto";

export const buildWorkspaceDomainStepMsg = () => "Build workspace domain";

export const generateWorkspaceStepMsg = () => "Generate workspace";

export const saveWorkspaceDomainStepMsg = () => "Save workspace domain";

export const saveWorkspaceDtoStepMsg = () => "Save workspace dto";

export const runCommandStepMsg = (command: string) => `Run command: ${command}`;

export const goToWorkspaceRootStepMsg = () => "Go to workspace root";

export const regenerateWorkspaceStepMsg = () => "Regenerate workspace";

export const generateProjectStepMsg = () => "Generate project";

export const checkProjectNotExistStepMsg = (projectName: string) =>
    `Check project not exist: ${projectName}`;

export const addProjectToWorkspaceDomainStepMsg = (projectName: string) =>
    `Add project to workspace domain: ${projectName}`;
