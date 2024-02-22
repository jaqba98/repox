import {singleton} from "tsyringe";

import {WorkspaceStructureAbstractBuilder} from "./workspace-structure-abstract.builder";
import {runCommand, writeJsonToFile} from "@lib/utils";
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
    generate(workspaceName: string) {
        const rootPackageJsonContent = this.buildRootPackageJson(workspaceName);
        writeJsonToFile(WorkspaceFileEnum.packageJson, rootPackageJsonContent);
        runCommand("npm install");
    }

    regenerate() {
    }

    private buildRootPackageJson(workspaceName: string): PackageJsonDtoPartialModel {
        return {
            ...this.buildBaseContent(workspaceName),
            devDependencies: {
                ...this.buildBaseDevDependencies()
            },
            dependencies: {
                ...this.buildBaseDependencies()
            }
        };
    }

    private buildBaseContent(workspaceName: string): BasePackageJsonDtoModel {
        return {
            name: workspaceName,
            version: "1.0.0",
            private: true
        };
    }

    private buildBaseDevDependencies(): PackageJsonDtoPartialModel["devDependencies"] {
        return {
            "@types/core-js": "^2.5.8",
            "@types/node": "^20.11.20",
            "repox": "^1.4.23",
            "tsc-alias": "^1.8.8",
            "typescript": "^5.3.3"
        };
    }

    private buildBaseDependencies(): PackageJsonDtoPartialModel["devDependencies"] {
        return {
            "core-js": "^3.36.0",
            "tsyringe": "^4.8.0"
        };
    }
}
