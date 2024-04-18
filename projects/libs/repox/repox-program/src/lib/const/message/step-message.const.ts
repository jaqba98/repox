import { type SystemProgramEnum } from "../../enum/system-program/system-program.enum";

/**
 * All step messages for that project.
 */

export const getArgumentValueStepMsg = (arg: string): string => `Get the value of the argument: --${arg}`;

export const systemProgramExistStepMsg = (systemProgram: SystemProgramEnum): string =>
    `Check if the program exists in the system: ${systemProgram}`;

export const goToWorkspaceRootStepMsg = (): string => "Go to the workspace root";

export const buildWorkspaceDtoStepMsg = (): string => "Build the dto workspace";

export const checkWorkspaceDtoStepMsg = (): string => "Check the dto workspace";

export const buildWorkspaceDomainStepMsg = (): string => "Build the domain workspace";

export const createFolderStepMsg = (folderName: string): string => `Create folder: ${folderName}`;

export const lintProjectStepMsg = (): string => "Lint project";

export const lintWorkspaceStepMsg = (): string => "Lint workspace";

export const folderNotExistStepMsg = (folderName: string): string => `Folder not exist: ${folderName}`;

export const getSingleCommandArgValueStepMsg = (arg: string): string =>
    `Get a single command argument value: ${arg}`;

export const getBooleanCommandArgValueStepMsg = (arg: string): string =>
    `Get boolean command arg value: ${arg}`;

export const changePathStepMsg = (path: string): string => `Change path: ${path}`;

export const generateWorkspaceStepMsg = (): string => "Generate workspace";

export const saveWorkspaceDomainStepMsg = (): string => "Save workspace domain";

export const saveWorkspaceDtoStepMsg = (): string => "Save workspace dto";

export const runCommandStepMsg = (command: string): string => `Run command: ${command}`;

export const regenerateWorkspaceStepMsg = (): string => "Regenerate workspace";

export const generateProjectStepMsg = (): string => "Generate project";

export const checkProjectNotExistStepMsg = (projectName: string): string =>
    `Check project not exist: ${projectName}`;

export const addProjectToWorkspaceDomainStepMsg = (projectName: string): string =>
    `Add project to workspace domain: ${projectName}`;

export const projectExistStepMsg = (name: string): string => `Project exist: ${name}`;

export const targetExistStepMsg = (target: string): string => `Target exist: ${target}`;

export const buildProjectStepMsg = (projectName: string): string =>
    `Build project: ${projectName}`;
