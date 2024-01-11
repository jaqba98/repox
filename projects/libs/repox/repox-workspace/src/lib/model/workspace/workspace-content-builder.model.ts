/**
 * The model is a recipe for all workspace builders.
 */
export interface WorkspaceContentBuilderModel {
    checkBeforeBuildContent: (path: string) => boolean;

    buildContent: (workspaceName: string) => string;
}

// todo: done