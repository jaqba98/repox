// done
import { singleton } from "tsyringe";

import { getCurrentFolderName, writeToFile } from "@lib/utils";

import { WorkspaceStructureAbstractBuilder } from "./workspace-structure-abstract.builder";
import { WorkspaceFileEnum } from "../../enum/workspace-file.enum";

@singleton()
/**
 * Create README.md file.
 */
export class ReadmeFileBuilder extends WorkspaceStructureAbstractBuilder {

    generate (): void {
        writeToFile(WorkspaceFileEnum.readmeMd, this.createReadMdTextDomain());
    }

    regenerate (): void {}

    private createReadMdTextDomain(): string {
        const name = getCurrentFolderName();
        return `# ${name}
`;
    }
}
