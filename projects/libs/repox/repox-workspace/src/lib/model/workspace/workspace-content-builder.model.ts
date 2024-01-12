/**
 * The model is a recipe for all workspace builders.
 */
export interface WorkspaceContentBuilderModel {
    checkBeforeBuildContent: (path: string) => boolean;

    buildContent: (path: string, workspaceName: string) => string;
}


// todo: refactor the code
