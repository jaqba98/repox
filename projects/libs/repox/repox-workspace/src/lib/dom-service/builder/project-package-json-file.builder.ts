import {singleton} from "tsyringe";

import {WorkspaceStructureAbstractBuilder} from "./workspace-structure-abstract.builder";
import {getCurrentFolderName, readJsonFile, writeJsonToFile} from "@lib/utils";
import {WorkspaceFileEnum} from "../../enum/workspace-file.enum";
import {PackageJsonDtoPartialModel} from "../../model/dto/package-json-dto.model";

@singleton()
/**
 * Create project package.json file.
 */
export class ProjectPackageJsonFileBuilder extends WorkspaceStructureAbstractBuilder {
    generate() {
        const rootPackageJsonContent = this.buildRootPackageJson();
        writeJsonToFile(WorkspaceFileEnum.packageJson, rootPackageJsonContent);
    }

    regenerate() {
        const rootPackageJsonContent = this.buildRootPackageJson();
        writeJsonToFile(WorkspaceFileEnum.packageJson, rootPackageJsonContent);
    }

    private buildRootPackageJson(): PackageJsonDtoPartialModel {
        const oldProjectPackageJson =
            readJsonFile<PackageJsonDtoPartialModel>(WorkspaceFileEnum.packageJson);
        return {
            ...oldProjectPackageJson,
            ...this.buildBase()
        };
    }

    private buildBase(): PackageJsonDtoPartialModel {
        return {
            name: getCurrentFolderName(),
            version: "1.0.0"
        };
    }
}
