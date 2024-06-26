import { singleton } from "tsyringe";

import { createFolder, pathExist } from "@lib/utils";

import { WorkspaceStructureAbstractBuilder } from "./workspace-structure-abstract.builder";
import { WorkspaceFolderEnum } from "../../enum/workspace-folder.enum";

@singleton()
/**
 * Create folder called app.
 */
export class AppFolderBuilder extends WorkspaceStructureAbstractBuilder {
    generate (): void {
        createFolder(WorkspaceFolderEnum.app);
    }

    regenerate (): void {
        if (pathExist(WorkspaceFolderEnum.app)) return;
        createFolder(WorkspaceFolderEnum.app);
    }
}
