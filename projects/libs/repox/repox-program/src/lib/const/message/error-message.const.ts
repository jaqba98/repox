import { type WorkspaceFileEnum } from '@lib/repox-workspace'
import { type SystemProgramEnum } from '../../enum/system-program/system-program.enum'

/**
 * All error messages for that project.
 */

export const argumentWasNotSpecifiedErrorMsg = (arg: string, alias: string): string =>
    `The argument --${arg} or alias -${alias} was not specified!`

export const argumentDoesNotHaveValidValueTypeErrorMsg = (arg: string, alias: string): string =>
    `The argument --${arg} or alias -${alias} does not have a valid value type!`

export const workspaceRootNotExistErrorMsg = (): string => 'You are not in an existing repox workspace!'

export const configurationFileNotFoundErrorMsg = (file: WorkspaceFileEnum): string =>
  `Configuration file not found: ${file}`

export const systemProgramDoesNotExistErrorMsg = (systemProgram: SystemProgramEnum): string =>
    `The ${systemProgram} program does not exist in the system!`

export const programNotExistErrorMsg = (program: string): string =>
    `The ${program} program does not exist!`

export const projectAlreadyExistErrorMsg = (project: string): string =>
    `The ${project} already exist!`

export const projectNotExistErrorMsg = (project: string): string =>
    `The ${project} not exist!`

export const commandNotExistErrorMsg = (program: string, command: string): string =>
    `The ${command} command does not exist for ${program} program!`

export const failedToCreateFolderErrorMsg = (folderName: string): string =>
    `Failed to create a folder named ${folderName}!`

export const folderAlreadyExistErrorMsg = (folderName: string): string =>
    `The ${folderName} folder already exist!`

export const argumentIsNotHaveSingleValueErrorMsg = (arg: string): string =>
    `The ${arg} argument does not have a single value!`

export const failedToChangePathErrorMsg = (path: string): string =>
    `Failed to change the path: ${path}!`

export const failedToGenerateWorkspaceErrorMsg = (): string => 'Failed to generate workspace!'

export const failedToRegenerateWorkspaceErrorMsg = (): string => 'Failed to regenerate workspace!'

export const failedToGenerateProjectErrorMsg = (): string => 'Failed to generate project!'

export const notSupportedProjectTypeErrorMsg = (type: string): string =>
    `Not supported project type: ${type}`
