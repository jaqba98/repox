import {singleton} from "tsyringe";

import {WorkspaceStructureAbstractBuilder} from "./workspace-structure-abstract.builder";
import {writeToFile} from "@lib/utils";
import {WorkspaceFileEnum} from "@lib/repox-workspace";

@singleton()
/**
 * Create project index file.
 */
export class ProjectIndexFileBuilder extends WorkspaceStructureAbstractBuilder {
    generate() {
        const projectIndexFileContent = `export * from "./lib/main";
`;
        writeToFile(WorkspaceFileEnum.indexTs, projectIndexFileContent);
    }

    regenerate() {
    }
}
