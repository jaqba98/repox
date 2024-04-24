// done
import { singleton } from "tsyringe";

import { writeToFile } from "@lib/utils";

import { WorkspaceStructureAbstractBuilder } from "./workspace-structure-abstract.builder";
import { WorkspaceFileEnum } from "../../enum/workspace-file.enum";

@singleton()
/**
 * Create jest.config.js file.
 */
export class JestConfigJsFileBuilder extends WorkspaceStructureAbstractBuilder {
    generate (): void {
        writeToFile(WorkspaceFileEnum.jestConfigJs, this.buildJestConfigJsContent());
    }

    regenerate (): void {
        writeToFile(WorkspaceFileEnum.jestConfigJs, this.buildJestConfigJsContent());
    }

    private buildJestConfigJsContent (): string {
        return `export const clearMocks = true;
export const coverageProvider = "v8";
export const preset = "ts-jest";
export const setupFilesAfterEnv = ["core-js/features/reflect"];
export const testEnvironment = "jest-environment-node";
export const moduleNameMapper = {};
`;
    }
}
