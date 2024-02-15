import {singleton} from "tsyringe";

import {WorkspaceStructureAbstractBuilder} from "./workspace-structure-abstract.builder";
import {createFolder, existPath} from "@lib/utils";
import {WorkspaceFolderEnum} from "@lib/repox-workspace";

@singleton()
/**
 * Create folder called projects.
 */
export class ProjectsFolderBuilder extends WorkspaceStructureAbstractBuilder {
    build() {
        if (existPath(WorkspaceFolderEnum.projects)) return;
        createFolder(WorkspaceFolderEnum.projects);
    }
}
