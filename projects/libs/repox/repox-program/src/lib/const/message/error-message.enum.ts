/**
 * All error messages for that project.
 */

export const programNotExist = (program: string): string =>
    `The ${program} program does not exist!`;

export const commandNotExist = (program: string, command: string): string =>
    `The ${command} command does not exist for the ${program} program!`;

export const argumentIsNotSpecified = (arg: string, alias: string): string =>
    `The --${arg} argument (or -${alias} alias) is not specified, but is required!`;

export const argumentMustHaveSingleTextValue = (arg: string, alias: string): string =>
    `The --${arg} argument (or -${alias} alias) must have a single text value!`;

export const systemProgramNotExist = (systemProgram: string): string =>
    `The ${systemProgram} program does not exist on the system!`;
