import {singleton} from "tsyringe";

import {isEmptyFolder, writeToFile} from "@lib/utils";

import {WorkspaceStructureAbstractBuilder} from "./workspace-structure-abstract.builder";
import {WorkspaceFileEnum} from "../../enum/workspace-file.enum";

@singleton()
/**
 * Create .gitkeep file.
 */
export class GitkeepFileBuilder extends WorkspaceStructureAbstractBuilder {
    generate() {
        writeToFile(WorkspaceFileEnum.gitkeep, "");
    }

    regenerate() {
        if (!isEmptyFolder(".")) return;
        writeToFile(WorkspaceFileEnum.gitkeep, "");
    }
}
