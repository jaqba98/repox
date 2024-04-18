// done
import { singleton } from "tsyringe";

import { writeToFile } from "@lib/utils";

import { WorkspaceStructureAbstractBuilder } from "./workspace-structure-abstract.builder";
import { WorkspaceFileEnum } from "../../enum/workspace-file.enum";

@singleton()
/**
 * Create .gitkeep file.
 */
export class GitkeepFileBuilder extends WorkspaceStructureAbstractBuilder {
    generate (): void {
        writeToFile(WorkspaceFileEnum.gitkeep, "");
    }

    regenerate (): void {}
}
