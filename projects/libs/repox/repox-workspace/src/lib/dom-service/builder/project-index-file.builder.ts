import {singleton} from "tsyringe";

import {WorkspaceStructureAbstractBuilder} from "./workspace-structure-abstract.builder";
import {writeToFile} from "@lib/utils";

@singleton()
/**
 * Create project index file.
 */
export class ProjectIndexFileBuilder extends WorkspaceStructureAbstractBuilder {
    generate() {
        const mainFileContent = `export * from "./lib/main";
`;
        writeToFile("main.ts", mainFileContent);
    }

    regenerate() {
    }
}
