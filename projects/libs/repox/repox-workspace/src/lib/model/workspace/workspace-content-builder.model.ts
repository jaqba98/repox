/**
 * The model is a recipe for all workspace builders.
 */
export interface WorkspaceContentBuilderModel {
    condition: (path: string) => boolean;

    build: () => string;
}

// todo: done