import { singleton } from "tsyringe";

import { writeJsonToFile } from "@lib/utils";

import { WorkspaceStructureAbstractBuilder } from "./workspace-structure-abstract.builder";
import { WorkspaceFileEnum } from "../../enum/workspace-file.enum";
import { PartialTsconfigJsonDtoModel } from "../../model/dto/tsconfig-json-dto.model";
import { ModuleKind, ScriptTarget } from "typescript";

@singleton()
/**
 * Create tsconfig.json file.
 */
export class TsconfigJsonFileBuilder extends WorkspaceStructureAbstractBuilder {
    generate (): void {
        writeJsonToFile(WorkspaceFileEnum.tsconfigJson, this.buildTsconfigJson());
        writeJsonToFile(WorkspaceFileEnum.tsconfigProdJson, this.buildTsconfigProdJson());
        writeJsonToFile(WorkspaceFileEnum.tsconfigDevJson, this.buildTsconfigDevJson());
    }

    regenerate (): void {}

    private buildTsconfigProdJson (): PartialTsconfigJsonDtoModel {
        return {
            "extends": "./tsconfig.json",
            "compilerOptions": {}
        };
    }

    private buildTsconfigDevJson (): PartialTsconfigJsonDtoModel {
        return {
            "extends": "./tsconfig.json",
            "compilerOptions": {
                "sourceMap": true
            }
        };
    }

    private buildTsconfigJson (): PartialTsconfigJsonDtoModel {
        return {
            "compilerOptions": {
                "target": "ES2022",
                "experimentalDecorators": true,
                "emitDecoratorMetadata": true,
                "module": "CommonJS",
                "rootDir": "projects",
                "outDir": "dist",
                "esModuleInterop": true,
                "forceConsistentCasingInFileNames": true,
                "strict": true,
                "skipLibCheck": true,
                "baseUrl": ".",
                "paths": {}
            },
            "exclude": [
                "node_modules"
            ]
        };
    }
}
