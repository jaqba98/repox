import {singleton} from "tsyringe";

import {WorkspaceContentBuilderModel} from "../../model/workspace/workspace-content-builder.model";
import {PackageJsonDtoModel} from "../../model/dto/package-json-dto.model";

@singleton()
/**
 * The service is responsible for building the package.json content file in the root of workspace.
 */
export class BuildRootPackageJsonContentService implements WorkspaceContentBuilderModel {
    checkBeforeBuildContent(_path: string): boolean {
        return true;
    }

    buildContent(workspaceName: string): string {
        const rootPackageJson: PackageJsonDtoModel = {
            name: workspaceName,
            version: "1.0.0",
            description: "",
            scripts: {
                test: "echo \"Error: no test specified\" && exit 1"
            },
            keywords: [],
            author: "",
            license: "ISC",
            devDependencies: {},
            dependencies: {}
        };
        return JSON.stringify(rootPackageJson, null, 2);
    }
}

// todo: done