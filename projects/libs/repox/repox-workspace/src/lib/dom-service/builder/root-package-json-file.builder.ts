import {singleton} from "tsyringe";

import {WorkspaceStructureAbstractBuilder} from "./workspace-structure-abstract.builder";
import {getCurrentFolderName, readJsonFile, writeJsonToFile} from "@lib/utils";
import {WorkspaceFileEnum} from "../../enum/workspace-file.enum";
import {
    BasePackageJsonDtoModel,
    PackageJsonDtoPartialModel
} from "../../model/dto/package-json-dto.model";

@singleton()
/**
 * Create root package.json file.
 */
export class RootPackageJsonFileBuilder extends WorkspaceStructureAbstractBuilder {
    generate() {
        const rootPackageJsonContent = this.buildRootPackageJson();
        writeJsonToFile(WorkspaceFileEnum.packageJson, rootPackageJsonContent);
    }

    regenerate() {
        const rootPackageJsonContent = this.buildRootPackageJson();
        writeJsonToFile(WorkspaceFileEnum.packageJson, rootPackageJsonContent);
    }

    private buildRootPackageJson(): PackageJsonDtoPartialModel {
        const oldRootPackageJson =
            readJsonFile<PackageJsonDtoPartialModel>(WorkspaceFileEnum.packageJson);
        return {
            ...oldRootPackageJson,
            ...this.buildBase(),
            devDependencies: {
                ...oldRootPackageJson.devDependencies,
                ...this.buildDevDependencies()
            },
            dependencies: {
                ...oldRootPackageJson.dependencies,
                ...this.buildDependencies()
            }
        };
    }

    private buildBase(): BasePackageJsonDtoModel {
        return {
            name: getCurrentFolderName(),
            version: "1.0.0",
            private: true
        };
    }

    private buildDevDependencies(): PackageJsonDtoPartialModel["devDependencies"] {
        return {
            "@types/core-js": "^2.5.8",
            "@types/node": "^20.11.20",
            "repox": "^1.4.26",
            "tsc-alias": "^1.8.8",
            "typescript": "^5.3.3"
        };
    }

    private buildDependencies(): PackageJsonDtoPartialModel["devDependencies"] {
        return {
            "core-js": "^3.36.0",
            "tsyringe": "^4.8.0"
        };
    }
}
