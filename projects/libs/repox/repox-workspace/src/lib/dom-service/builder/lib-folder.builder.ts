import {singleton} from "tsyringe";

import {createFolder, pathExist} from "@lib/utils";

import {WorkspaceStructureAbstractBuilder} from "./workspace-structure-abstract.builder";
import {WorkspaceFolderEnum} from "../../enum/workspace-folder.enum";

@singleton()
/**
 * Create folder called lib.
 */
export class LibFolderBuilder extends WorkspaceStructureAbstractBuilder {
    generate() {
        createFolder(WorkspaceFolderEnum.lib);
    }

    regenerate() {
        if (pathExist(WorkspaceFolderEnum.lib)) return;
        createFolder(WorkspaceFolderEnum.lib);
    }
}
