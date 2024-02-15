import {singleton} from "tsyringe";

import {WorkspaceStructureAbstractBuilder} from "./workspace-structure-abstract.builder";
import {createFolder, existPath} from "@lib/utils";
import {WorkspaceFolderEnum} from "../../enum/workspace-folder.enum";

@singleton()
/**
 * Create folder called libs.
 */
export class ToolsFolderBuilder extends WorkspaceStructureAbstractBuilder {
    build() {
        if (existPath(WorkspaceFolderEnum.tools)) return;
        createFolder(WorkspaceFolderEnum.tools);
    }
}
