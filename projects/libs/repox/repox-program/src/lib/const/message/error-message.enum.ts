/**
 * All error messages for that project.
 */

export const programNotExist = (program: string): string =>
    `The ${program} program does not exist!`;


export const commandNotExist = (program: string, command: string): string =>
    `The ${command} command does not exist for the ${program} program!`;
