import {singleton} from "tsyringe";

import {writeToFile} from "@lib/utils";

import {WorkspaceStructureAbstractBuilder} from "./workspace-structure-abstract.builder";
import {WorkspaceFileEnum} from "../../enum/workspace-file.enum";

@singleton()
/**
 * Create .npmrc file.
 */
export class NpmrcFileBuilder extends WorkspaceStructureAbstractBuilder {
    generate() {
        writeToFile(WorkspaceFileEnum.npmrc, this.createNpmrcFile());
    }

    regenerate() {
        writeToFile(WorkspaceFileEnum.npmrc, this.createNpmrcFile());
    }

    private createNpmrcFile() {
        return `git-branch-lockfile=true
`;
    }
}
