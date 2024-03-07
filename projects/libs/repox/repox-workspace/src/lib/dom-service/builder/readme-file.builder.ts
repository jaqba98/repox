import {singleton} from "tsyringe";

import {getCurrentFolderName} from "@lib/utils";

import {WorkspaceStructureAbstractBuilder} from "./workspace-structure-abstract.builder";
import {WorkspaceDomainStore} from "@lib/repox-workspace";

@singleton()
/**
 * Create README.md file.
 */
export class ReadmeFileBuilder extends WorkspaceStructureAbstractBuilder {
    constructor(private readonly workspaceDomain: WorkspaceDomainStore) {
        super();
    }

    generate() {
        if (this.workspaceDomain.workspaceDomain) {
            const name = getCurrentFolderName();
            this.workspaceDomain.workspaceDomain.readmeMdTextDomain = `# ${name}
`;
        }
    }

    regenerate() {
    }
}
