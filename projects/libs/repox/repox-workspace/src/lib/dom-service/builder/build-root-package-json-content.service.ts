import {singleton} from "tsyringe";

import {WorkspaceContentBuilderModel} from "../../model/workspace/workspace-content-builder.model";
import {PackageJsonDtoModel} from "../../model/dto/package-json-dto.model";
import {readJsonFile} from "@lib/utils";
import {EMPTY_STRING} from "@lib/const";

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
        const customRootPackageJson: PackageJsonDtoModel = { ...currentRootPackageJson };
        delete customRootPackageJson.name;
        delete customRootPackageJson.version;
        delete customRootPackageJson.description;
        delete customRootPackageJson.scripts;
        delete customRootPackageJson.keywords;
        delete customRootPackageJson.author;
        delete customRootPackageJson.license;
        delete customRootPackageJson.devDependencies;
        delete customRootPackageJson.dependencies;
        const mergedRootPackageJson: PackageJsonDtoModel = {
            name: currentRootPackageJson?.name ?? workspaceName,
            version: currentRootPackageJson?.version ?? "1.0.0",
            description: currentRootPackageJson?.description ?? EMPTY_STRING,
            scripts: currentRootPackageJson?.scripts ?? {},
            keywords: currentRootPackageJson?.keywords ?? [],
            author: currentRootPackageJson?.author ?? EMPTY_STRING,
            license: currentRootPackageJson?.license ?? "ISC",
            devDependencies: {
                ...currentRootPackageJson.devDependencies,
                typescript: "5.3.3"
            },
            dependencies: {
                ...currentRootPackageJson.dependencies
            },
            ...customRootPackageJson
        };
        return JSON.stringify(mergedRootPackageJson, null, 2);
    }
}

// todo: done