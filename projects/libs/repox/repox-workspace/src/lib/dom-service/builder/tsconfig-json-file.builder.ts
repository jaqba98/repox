import {singleton} from "tsyringe";
import ts from "typescript";

import {WorkspaceStructureAbstractBuilder} from "./workspace-structure-abstract.builder";
import {readJsonFile, writeJsonToFile} from "@lib/utils";
import {WorkspaceFileEnum} from "../../enum/workspace-file.enum";
import {TsconfigJsonDtoPartialModel} from "../../model/dto/tsconfig-json-dto.model";
import {WorkspaceFolderEnum} from "../../enum/workspace-folder.enum";
import {PackageJsonDtoPartialModel} from "../../model/dto/package-json-dto.model";


@singleton()
/**
 * Create tsconfig.json file.
 */
export class TsconfigJsonFileBuilder extends WorkspaceStructureAbstractBuilder {
    generate() {
        writeJsonToFile<TsconfigJsonDtoPartialModel>(
            WorkspaceFileEnum.tsconfigJson,
            this.createTsconfigJson()
        );
    }

    regenerate() {
        writeJsonToFile<TsconfigJsonDtoPartialModel>(
            WorkspaceFileEnum.tsconfigJson,
            this.createTsconfigJson()
        );
    }

    private createTsconfigJson(): TsconfigJsonDtoPartialModel {
        const oldTsconfigJson =
            readJsonFile<TsconfigJsonDtoPartialModel>(WorkspaceFileEnum.tsconfigJson);
        return {
            ...oldTsconfigJson,
            compilerOptions: {
                ...oldTsconfigJson.compilerOptions,
                target: ts.server.protocol.ScriptTarget.ES2022,
                experimentalDecorators: true,
                emitDecoratorMetadata: true,
                module: ts.server.protocol.ModuleKind.CommonJS,
                rootDir: WorkspaceFolderEnum.projects,
                outDir: WorkspaceFolderEnum.dist,
                esModuleInterop: true,
                forceConsistentCasingInFileNames: true,
                strict: true,
                skipLibCheck: true,
                baseUrl: ".",
                sourceMap: true,
                paths: {
                    ...oldTsconfigJson.compilerOptions?.paths
                }
            },
            exclude: [
                "node_modules",
                "**/*.spec.ts",
                "**/*.test.ts",
                "**/jest.config.ts"
            ]
        };
    }
}
