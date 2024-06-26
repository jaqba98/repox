import { singleton } from "tsyringe";

import { writeToFile } from "@lib/utils";

import { WorkspaceStructureAbstractBuilder } from "./workspace-structure-abstract.builder";
import { WorkspaceFileEnum } from "../../enum/workspace-file.enum";

@singleton()
/**
 * Create main.ts file bilder.
 */
export class MainTsFileBuilder extends WorkspaceStructureAbstractBuilder {
    generate (): void {
        writeToFile(WorkspaceFileEnum.mainTs, this.createMainTsFileContent());
    }

    regenerate (): void {
    }

    private createMainTsFileContent (): string {
        return `console.log("Hello, World!");
`;
    }
}
