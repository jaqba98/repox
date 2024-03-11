import {singleton} from "tsyringe";

import {getCurrentFolderName} from "@lib/utils";

import {WorkspaceStructureAbstractBuilder} from "./workspace-structure-abstract.builder";
import {WorkspaceDomainStore} from "../store/workspace-domain.store";

@singleton()
/**
 * Create README.md file.
 */
export class ReadmeFileBuilder extends WorkspaceStructureAbstractBuilder {
    constructor(private readonly store: WorkspaceDomainStore) {
        super();
    }

    generate() {
        this.createDefaultReadMdTextDomain();
    }

    regenerate() {
        this.createDefaultReadMdTextDomain();
    }

    private createDefaultReadMdTextDomain() {
        if (!this.store.workspaceDomain) return;
        const name = getCurrentFolderName();
        this.store.workspaceDomain.readmeMdTextDomain = `# ${name}
`;
    }
}
