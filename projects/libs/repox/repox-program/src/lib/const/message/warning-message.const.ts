/**
 * All warning messages for that project.
 */

export const moreInfoLookThroughOurDocsMsg = (): string =>
    "For more info, take a deeper look through our documentation: https://www.repox.dev/#/docs";

export const systemProgramNotExistResolveThisIssueMsg = (url: string): string =>
    `To resolve this issue, follow these steps:
1) Go to ${url} website
2) Download and install the program on your system`;


export const specifyDifferentMsg = (kind: string): string =>
    `Specify a different ${kind} and restart the program.`;
