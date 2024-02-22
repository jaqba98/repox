import {singleton} from "tsyringe";

import {WorkspaceStructureAbstractBuilder} from "./workspace-structure-abstract.builder";
import {runCommand, writeJsonToFile} from "@lib/utils";
import {WorkspaceFileEnum} from "../../enum/workspace-file.enum";
import {PackageJsonDtoPartialModel} from "../../model/dto/package-json-dto.model";

@singleton()
/**
 * Create root package.json file.
 */
export class RootPackageJsonFileBuilder extends WorkspaceStructureAbstractBuilder {
    generate(workspaceName: string) {
        writeJsonToFile<PackageJsonDtoPartialModel>(WorkspaceFileEnum.packageJson, {
            name: workspaceName,
            version: "1.0.0",
            description: "",
            scripts: {},
            keywords: [],
            author: "",
            license: "ISC",
            devDependencies: {
                typescript: "^5.3.3"
            }
        });
        runCommand("npm install");
    }

    regenerate() {
    }
}
