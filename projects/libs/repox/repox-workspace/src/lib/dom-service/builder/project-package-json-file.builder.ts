import {singleton} from "tsyringe";

import {getCurrentFolderName, writeJsonToFile} from "@lib/utils";

import {WorkspaceStructureAbstractBuilder} from "./workspace-structure-abstract.builder";
import {PackageJsonDomainModel} from "../../model/workspace/package-json-domain.model";
import {WorkspaceFileEnum} from "../../enum/workspace-file.enum";

@singleton()
/**
 * Create a project package.json file.
 */
export class ProjectPackageJsonFileBuilder extends WorkspaceStructureAbstractBuilder {
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
