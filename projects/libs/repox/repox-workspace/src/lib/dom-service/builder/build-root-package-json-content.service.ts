import {singleton} from "tsyringe";

import {WorkspaceContentBuilderModel} from "../../model/workspace/workspace-content-builder.model";
import {PackageJsonDtoModel} from "../../model/dto/package-json-dto.model";
import {EMPTY_STRING} from "@lib/const";

@singleton()
/**
 * The service is responsible for building the package.json content file in the root of workspace.
 */
export class BuildRootPackageJsonContentService implements WorkspaceContentBuilderModel {
    checkBeforeBuildContent(_path: string): boolean {
        return true;
    }

    buildContent(_path: string, workspaceName: string): string {
        const rootPackageJson: PackageJsonDtoModel = {
            name: workspaceName,
            version: "1.0.0",
            description: EMPTY_STRING,
            scripts: {},
            keywords: [],
            author: EMPTY_STRING,
            license: "ISC",
            devDependencies: {
                typescript: "5.3.3"
            },
            dependencies: {}
        };
        return JSON.stringify(rootPackageJson, null, 2);
    }
}

