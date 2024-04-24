// done
import { singleton } from "tsyringe";

import { getCurrentFolderName, writeJsonToFile } from "@lib/utils";

import { WorkspaceStructureAbstractBuilder } from "./workspace-structure-abstract.builder";
import { WorkspaceFileEnum } from "../../enum/workspace-file.enum";
import { PackageJsonDtoModel } from "../../model/dto/package-json-dto.model";

@singleton()
/**
 * Create a workspace package.json file.
 */
export class WorkspacePackageJsonFileBuilder extends WorkspaceStructureAbstractBuilder {
    generate (): void {
        writeJsonToFile(WorkspaceFileEnum.packageJson, this.buildWorkspacePackageJson());
    }

    regenerate (): void {
        writeJsonToFile(WorkspaceFileEnum.packageJson, this.buildWorkspacePackageJson());
    }

    private buildWorkspacePackageJson (): PackageJsonDtoModel {
        return {
            "name": getCurrentFolderName(),
            "version": "1.0.0",
            "private": true,
            "dependencies": {
                "command-exists": "^1.2.9",
                "core-js": "^3.37.0",
                "deepcopy": "^2.1.0",
                "glob": "^10.3.12",
                "jsonschema": "^1.4.1",
                "repox": "^1.4.76",
                "tsc-alias": "^1.8.8",
                "tsyringe": "^4.8.0"
            },
            "devDependencies": {
                "@types/command-exists": "^1.2.3",
                "@types/core-js": "^2.5.8",
                "@types/jest": "^29.5.12",
                "@types/node": "^20.12.7",
                "@typescript-eslint/eslint-plugin": "^7.7.0",
                "@typescript-eslint/parser": "^7.7.0",
                "eslint": "8.57.0",
                "globals": "^15.0.0",
                "jest": "29.7.0",
                "ts-jest": "^29.1.2",
                "tsc-alias": "^1.8.8",
                "tsyringe": "^4.8.0",
                "typescript": "^5.4.5"
            }
        };
    }
}
