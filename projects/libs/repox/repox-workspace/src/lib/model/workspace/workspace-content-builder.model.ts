/**
 * The model is a recipe for all workspace builders.
 */
export interface WorkspaceContentBuilderModel {
    build: () => string;
}

// todo: done