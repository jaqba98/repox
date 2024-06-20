/**
 * All plain messages for that project.
 */

export const lintProjectPlainMsg = (projectName: string): string =>
    `Lint the project: ${projectName}`;

export const lintWorkspacePlainMsg = (): string => "Lint the workspace";

export const runCommandPlainMsg = (command: string): string =>
    `Run command: ${command}`;
