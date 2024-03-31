/**
 * All warning messages for that project.
 */

export const specifyArgumentAndRunAgainWarningMsg = (arg: string, alias: string, type: string): string =>
  `Specify the argument --${arg} or alias -${alias} with a ${type} value type and run the command again.`

export const specifiedFolderThatExistOnDiskWarningMsg = (): string =>
  'You specified the name of a folder that already exists on disk.'

export const specifyDifferentFolderNameWarningMsg = (): string =>
  'Specify a different folder name and run the program again.'

export const specifyArgumentCorrectlyWarningMsg = (arg: string): string =>
    `Specify the --${arg} argument correctly and run the program again.`

export const installAndRunAgainWarningMsg = (systemProgram: string): string =>
    `Install ${systemProgram} and run the command again.`

export const linkToProgramWarningMsg = (systemProgram: string, url: string): string =>
    `Link to ${systemProgram}: ${url}`

export const pathNotExistWarningMsg = (path: string): string =>
    `The ${path} path does not exist`

export const navigateToExistingWorkspaceFolderWarningMsg = (): string =>
  'Navigate to the existing workspace folder and run the command again'

export const specifyDifferentProjectNameWarningMsg = (): string =>
  'Specify a different project name and run the program again.'
