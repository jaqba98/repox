import {singleton} from "tsyringe";

import {WorkspaceContentBuilderModel} from "../../model/workspace/workspace-content-builder.model";
import {TsconfigJsonDtoModel} from "../../model/dto/tsconfig-json-dto.model";

@singleton()
/**
 * The service is responsible for building the tsconfig.json content file.
 */
export class BuildTsconfigJsonContentService implements WorkspaceContentBuilderModel {
    checkBeforeBuildContent(_path: string): boolean {
        return true;
    }

    buildContent(_path: string, _workspaceName: string): string {
        const tsconfig: TsconfigJsonDtoModel = {
            compilerOptions: {
                target: "es2016",
                module: "commonjs",
                esModuleInterop: true,
                forceConsistentCasingInFileNames: true,
                strict: true,
                skipLibCheck: true,
                experimentalDecorators: true,
                emitDecoratorMetadata: true,
                rootDir: "./projects",
                outDir: "./dist",
                sourceMap: true,
                paths: {}
            },
            include: [
                "./projects"
            ]
        };
        return JSON.stringify(tsconfig, null, 2);
    }
}

