import {singleton} from "tsyringe";

import {createFolder, pathExist} from "@lib/utils";

import {WorkspaceStructureAbstractBuilder} from "./workspace-structure-abstract.builder";
import {WorkspaceFolderEnum} from "../../enum/workspace-folder.enum";

@singleton()
/**
 * Create folder called libs.
 */
export class LibsFolderBuilder extends WorkspaceStructureAbstractBuilder {
    generate() {
        createFolder(WorkspaceFolderEnum.libs);
    }

    regenerate() {
        if (pathExist(WorkspaceFolderEnum.libs)) return;
        createFolder(WorkspaceFolderEnum.libs);
    }
}
