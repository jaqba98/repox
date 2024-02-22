/**
 * The abstract builder contains methods which can be implemented
 * in the workspace structure builder service.
 */
export abstract class WorkspaceStructureAbstractBuilder {
    abstract generate(workspaceName: string): void;

    abstract regenerate(): void;
}
