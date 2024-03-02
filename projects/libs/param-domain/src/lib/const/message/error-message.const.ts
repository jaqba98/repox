/**
 * All error messages for that project.
 */

export const argumentMustHaveSingleTextValue = (arg: string): string =>
    `The --${arg} argument must have a single text value!`;

export const aliasMustHaveSingleTextValue = (alias: string): string =>
    `The -${alias} alias must have a single text value!`;

export const argumentIsNotSpecified = (arg: string): string =>
    `The --${arg} argument is not specified, but is required!`;
