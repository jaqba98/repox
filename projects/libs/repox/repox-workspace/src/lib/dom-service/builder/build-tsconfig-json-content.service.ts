import {singleton} from "tsyringe";

import {WorkspaceContentBuilderModel} from "../../model/workspace/workspace-content-builder.model";
import {TsconfigJsonDtoModel} from "../../model/dto/tsconfig-json-dto.model";
import {readJsonFile} from "@lib/utils";

@singleton()
/**
 * The service is responsible for building the tsconfig.json content file.
 */
export class BuildTsconfigJsonContentService implements WorkspaceContentBuilderModel {
    checkBeforeBuildContent(_path: string): boolean {
        return true;
    }

    buildContent(path: string, _workspaceName: string): string {
        const currentTsconfigJson = readJsonFile<TsconfigJsonDtoModel>(path);
        const customTsconfigJson: TsconfigJsonDtoModel = { ...currentTsconfigJson };
        delete customTsconfigJson?.compilerOptions?.rootDir;
        delete customTsconfigJson?.compilerOptions?.outDir;
        delete customTsconfigJson?.exclude;
        const tsconfig: TsconfigJsonDtoModel = {
            compilerOptions: {
                rootDir: currentTsconfigJson?.compilerOptions?.rootDir ?? "./projects",
                outDir: currentTsconfigJson?.compilerOptions?.outDir ?? "./dist",
                ...customTsconfigJson?.compilerOptions
            },
            exclude: [
                "**/jest.config.ts",
                ...(currentTsconfigJson?.exclude ?? []),
            ],
            ...customTsconfigJson
        };
        return JSON.stringify(tsconfig, null, 2);
    }
}

// todo: done