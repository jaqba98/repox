
/**
 * The repox command model for all commands.
 */

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface EmptyRepoxCommandModel {
}

export interface GenerateWorkspaceCommandModel {
    workspaceName: string;
}

export interface RegenerateWorkspaceCommandModel {
    isForceMode: boolean;
}

export interface GenerateProjectCommandModel {
    projectName: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    projectType: any;
    projectPath: string;
}

export interface BuildProjectRepoxCommandModel {
    projectName: string;
}

export interface PublishNpmRepoxCommandModel {
    projectName: string;
}

export interface LintProjectRepoxCommandModel {
    isFixMode: boolean;
}

export type TRepoxCommandModel =
    EmptyRepoxCommandModel |
    GenerateWorkspaceCommandModel |
    RegenerateWorkspaceCommandModel |
    GenerateProjectCommandModel |
    BuildProjectRepoxCommandModel |
    PublishNpmRepoxCommandModel |
    LintProjectRepoxCommandModel;

// todo: refactor the code
