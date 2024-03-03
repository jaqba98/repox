/**
 * All error messages for that project.
 */

export const programNotExistMsg = (program: string): string =>
    `The ${program} program does not exist!`;

export const commandNotExistMsg = (program: string, command: string): string =>
    `The ${command} command does not exist for the ${program} program!`;

export const argumentIsNotSpecifiedMsg = (arg: string, alias: string): string =>
    `The --${arg} argument (or -${alias} alias) is not specified, but is required!`;

export const argumentMustHaveSingleTextValueMsg = (arg: string, alias: string): string =>
    `The --${arg} argument (or -${alias} alias) must have a single text value!`;

export const systemProgramNotExistMsg = (systemProgram: string): string =>
    `The ${systemProgram} program does not exist on the system!`;

export const folderAlreadyExistMsg = (folder: string): string =>
    `The ${folder} folder already exists!`;
