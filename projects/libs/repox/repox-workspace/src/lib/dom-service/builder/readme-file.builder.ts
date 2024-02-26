import {singleton} from "tsyringe";

import {getCurrentFolderName, writeToFile} from "@lib/utils";

import {WorkspaceStructureAbstractBuilder} from "./workspace-structure-abstract.builder";
import {WorkspaceFileEnum} from "../../enum/workspace-file.enum";

@singleton()
/**
 * Create README.md file.
 */
export class ReadmeFileBuilder extends WorkspaceStructureAbstractBuilder {
    generate() {
        writeToFile(WorkspaceFileEnum.readmeMd, this.createReadmeFile());
    }

    regenerate() {
        writeToFile(WorkspaceFileEnum.readmeMd, this.createReadmeFile());
    }

    private createReadmeFile() {
        const name = getCurrentFolderName();
        return `# ${name}`;
    }
}
