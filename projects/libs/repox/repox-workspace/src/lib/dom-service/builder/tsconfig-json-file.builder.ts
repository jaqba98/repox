import {singleton} from "tsyringe";
import ts from "typescript";

import {WorkspaceStructureAbstractBuilder} from "./workspace-structure-abstract.builder";
import {WorkspaceFolderEnum} from "../../enum/workspace-folder.enum";
import {WorkspaceDomainStore} from "../store/workspace-domain.store";


@singleton()
/**
 * Create tsconfig.json file.
 */
export class TsconfigJsonFileBuilder extends WorkspaceStructureAbstractBuilder {
    constructor(private readonly store: WorkspaceDomainStore) {
        super();
    }

    generate() {
        if (this.store.workspaceDomain) {
            this.store.workspaceDomain.tsconfigJsonDomain = {
                compilerOptions: {
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
                    paths: {}
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

    regenerate() {
    }
}
