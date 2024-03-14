import {singleton} from "tsyringe";

import {WorkspaceStructureAbstractBuilder} from "./workspace-structure-abstract.builder";
import {writeToFile} from "@lib/utils";

@singleton()
/**
 * Create project main file.
 */
export class ProjectMainFileBuilder extends WorkspaceStructureAbstractBuilder {
    generate() {
        const mainFileContent = `export function main() {
    return "main";        
}
`;
        writeToFile("main.ts", mainFileContent);
    }

    regenerate() {
    }
}
