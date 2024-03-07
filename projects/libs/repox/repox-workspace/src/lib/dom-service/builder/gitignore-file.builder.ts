import {singleton} from "tsyringe";
import {WorkspaceDomainStore} from "@lib/repox-workspace";

import {WorkspaceStructureAbstractBuilder} from "./workspace-structure-abstract.builder";

@singleton()
/**
 * Create .gitignore file.
 */
export class GitignoreFileBuilder extends WorkspaceStructureAbstractBuilder {
    constructor(private readonly store: WorkspaceDomainStore) {
        super();
    }

    generate() {
        if (this.store.workspaceDomain) {
            this.store.workspaceDomain.gitignoreTextDomain = `# JetBrains tools
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

    regenerate() {
    }
}
