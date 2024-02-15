import {singleton} from "tsyringe";

import {WorkspaceStructureAbstractBuilder} from "./workspace-structure-abstract.builder";
import {createFolder, existPath} from "@lib/utils";
import {WorkspaceFolderEnum} from "../../enum/workspace-folder.enum";

@singleton()
/**
 * Create folder called apps.
 */
export class AppsFolderBuilder extends WorkspaceStructureAbstractBuilder {
    build() {
        if (existPath(WorkspaceFolderEnum.apps)) return;
        createFolder(WorkspaceFolderEnum.apps);
    }
}
