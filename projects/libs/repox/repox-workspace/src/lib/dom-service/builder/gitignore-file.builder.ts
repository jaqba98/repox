import {singleton} from "tsyringe";

import {WorkspaceStructureAbstractBuilder} from "./workspace-structure-abstract.builder";
import {writeToFile} from "@lib/utils";
import {WorkspaceFileEnum} from "../../enum/workspace-file.enum";

@singleton()
/**
 * Create .gitignore file.
 */
export class GitignoreFileBuilder extends WorkspaceStructureAbstractBuilder {
    generate() {
        writeToFile(WorkspaceFileEnum.gitignore, this.createGitignoreContent());
    }

    regenerate() {
        writeToFile(WorkspaceFileEnum.gitignore, this.createGitignoreContent());
    }

    private createGitignoreContent(): string {
        return `# JetBrains tools
.idea

# Compilation output
dist

# Dependency directories
node_modules

# Temporary files and directories
tmp
`;
    }
}
