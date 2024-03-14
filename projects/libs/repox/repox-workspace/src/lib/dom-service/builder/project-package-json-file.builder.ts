import {singleton} from "tsyringe";

import {getCurrentFolderName, writeJsonToFile} from "@lib/utils";

import {WorkspaceStructureAbstractBuilder} from "./workspace-structure-abstract.builder";
import {PackageJsonDomainModel} from "../../model/workspace/package-json-domain.model";
import {WorkspaceDomainStore} from "../store/workspace-domain.store";
import {WorkspaceFileEnum} from "@lib/repox-workspace";

@singleton()
/**
 * Create a project package.json file.
 */
export class ProjectPackageJsonFileBuilder extends WorkspaceStructureAbstractBuilder {
    constructor(private readonly store: WorkspaceDomainStore) {
        super();
    }

    generate() {
        writeJsonToFile(WorkspaceFileEnum.packageJson, this.buildDefaultWorkspacePackageJson());
    }

    regenerate() {
    }

    private buildDefaultWorkspacePackageJson(): Pick<PackageJsonDomainModel, "name" | "version"> {
        return {
            name: getCurrentFolderName(),
            version: "1.0.0"
        };
    }
}
