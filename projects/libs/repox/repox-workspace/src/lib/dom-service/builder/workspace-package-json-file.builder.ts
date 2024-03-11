import {singleton} from "tsyringe";

import {getCurrentFolderName} from "@lib/utils";

import {WorkspaceStructureAbstractBuilder} from "./workspace-structure-abstract.builder";
import {PackageJsonDomainModel} from "../../model/workspace/package-json-domain.model";
import {WorkspaceDomainStore} from "../store/workspace-domain.store";

@singleton()
/**
 * Create a workspace package.json file.
 */
export class WorkspacePackageJsonFileBuilder extends WorkspaceStructureAbstractBuilder {
    constructor(private readonly store: WorkspaceDomainStore) {
        super();
    }

    generate() {
        if (!this.store.workspaceDomain) return;
        this.store.workspaceDomain.workspacePackageJsonDomain =
            this.buildDefaultWorkspacePackageJson();
    }

    regenerate() {
        if (!this.store.workspaceDomain) return;
        this.store.workspaceDomain.workspacePackageJsonDomain = {
            ...this.store.workspaceDomain.workspacePackageJsonDomain,
            ...this.buildDefaultWorkspacePackageJson(),
            dependencies: {
                ...this.store.workspaceDomain.workspacePackageJsonDomain.dependencies,
                ...this.buildDefaultWorkspacePackageJson().dependencies,
            },
            devDependencies: {
                ...this.store.workspaceDomain.workspacePackageJsonDomain.devDependencies,
                ...this.buildDefaultWorkspacePackageJson().devDependencies,
            }
        };
    }

    private buildDefaultWorkspacePackageJson(): PackageJsonDomainModel {
        return {
            name: getCurrentFolderName(),
            version: "1.0.0",
            private: true,
            dependencies: {
                "@types/core-js": "^2.5.8",
                "@types/node": "^20.11.25",
                "repox": "^1.4.41",
                "tsc-alias": "^1.8.8"
            },
            devDependencies: {
                "core-js": "^3.36.0",
                "tsyringe": "^4.8.0",
                "typescript": "^5.4.2"
            }
        };
    }
}
