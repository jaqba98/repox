import {singleton} from "tsyringe";

import {WorkspaceContentBuilderModel} from "../../model/workspace/workspace-content-builder.model";
import {PackageJsonDtoModel} from "../../model/dto/package-json-dto.model";
import {readJsonFile} from "@lib/utils";

@singleton()
/**
 * The service is responsible for building the package.json content file in the root of workspace.
 */
export class BuildRootPackageJsonContentService implements WorkspaceContentBuilderModel {
    checkBeforeBuildContent(_path: string): boolean {
        return true;
    }

    buildContent(path: string, workspaceName: string): string {
        const currentRootPackageJson = readJsonFile<PackageJsonDtoModel>(path);
        const rootPackageJson: PackageJsonDtoModel = {
            ...currentRootPackageJson,
            name: workspaceName,
            version: "1.0.0",
            description: "",
            scripts: {
                ...currentRootPackageJson.scripts,
                test: "echo \"Error: no test specified\" && exit 1"
            },
            keywords: currentRootPackageJson.keywords ?? [],
            author: "",
            license: "ISC",
            devDependencies: {
                ...currentRootPackageJson.devDependencies
            },
            dependencies: {
                ...currentRootPackageJson.dependencies
            }
        };
        return JSON.stringify(rootPackageJson, null, 2);
    }
}

// todo: done