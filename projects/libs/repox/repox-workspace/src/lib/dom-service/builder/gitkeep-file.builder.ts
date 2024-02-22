import {singleton} from "tsyringe";

import {WorkspaceStructureAbstractBuilder} from "./workspace-structure-abstract.builder";
import {writeToFile} from "@lib/utils";
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
    }
}
