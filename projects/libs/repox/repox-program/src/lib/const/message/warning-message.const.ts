/**
 * All warning messages for that project.
 */

export const moreInfoLookThroughOurDocs = (): string =>
    "For more info, take a deeper look through our documentation: https://www.repox.dev/#/docs";

export const systemProgramNotExistResolveThisIssue = (url: string): string =>
    `To resolve this issue, follow these steps:
1) Go to ${url} website
2) Download and install the program on your system`;


export const specifyDifferent = (kind: string): string =>
    `Specify a different ${kind} and restart the program.`;
