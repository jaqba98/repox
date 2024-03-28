/**
 * All step messages for that project.
 */

export const createFolderStepMsg = (folderName: string): string => `Create folder: ${folderName}`

export const folderNotExistStepMsg = (folderName: string): string =>
    `Folder not exist: ${folderName}`

export const getSingleCommandArgValueStepMsg = (arg: string): string =>
    `Get a single command argument value: ${arg}`

export const getBooleanCommandArgValueStepMsg = (arg: string): string =>
    `Get a boolean command argument value: ${arg}`

export const systemProgramExistStepMsg = (systemProgram: string): string =>
    `System program exist: ${systemProgram}`

export const changePathStepMsg = (path: string): string => `Change path: ${path}`

export const buildWorkspaceDtoStepMsg = (): string => 'Build workspace dto'

export const buildWorkspaceDomainStepMsg = (): string => 'Build workspace domain'

export const generateWorkspaceStepMsg = (): string => 'Generate workspace'

export const saveWorkspaceDomainStepMsg = (): string => 'Save workspace domain'

export const saveWorkspaceDtoStepMsg = (): string => 'Save workspace dto'

export const runCommandStepMsg = (command: string): string => `Run command: ${command}`

export const goToWorkspaceRootStepMsg = (): string => 'Go to workspace root'

export const regenerateWorkspaceStepMsg = (): string => 'Regenerate workspace'

export const generateProjectStepMsg = (): string => 'Generate project'

export const checkProjectNotExistStepMsg = (projectName: string): string =>
    `Check project not exist: ${projectName}`

export const addProjectToWorkspaceDomainStepMsg = (projectName: string): string =>
    `Add project to workspace domain: ${projectName}`

export const checkProjectExistStepMsg = (projectName: string): string =>
    `Check project exist: ${projectName}`

export const buildProjectStepMsg = (projectName: string): string =>
    `Build project: ${projectName}`
