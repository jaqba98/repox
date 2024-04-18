import { singleton } from "tsyringe";

import { WorkspaceStructureAbstractBuilder } from "./workspace-structure-abstract.builder";
import { WorkspaceDomainStore } from "../store/workspace-domain.store";

@singleton()
/**
 * Create README.md file.
 */
export class ReadmeFileBuilder extends WorkspaceStructureAbstractBuilder {
    constructor (private readonly store: WorkspaceDomainStore) {
        super();
    }

    generate (): void {
        this.createDefaultReadMdTextDomain();
    }

    regenerate (): void {
        this.createDefaultReadMdTextDomain();
    }

    private createDefaultReadMdTextDomain (): void {
    // if (this.store.workspaceDomain == null) return
    //     const name = getCurrentFolderName()
    //     this.store.workspaceDomain.readmeMdTextDomain = `# ${name}
    // `
    }
}
