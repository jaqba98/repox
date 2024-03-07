/**
 * The domain model uses by the system to work with repox.json file.
 */

export interface RepoxJsonDomainProjectModel {
    name: string;
    root: string;
    sourceRoot: string;
    targets: {};
}

export interface RepoxJsonDomainModel {
    projects: Record<string, RepoxJsonDomainProjectModel>;
}
