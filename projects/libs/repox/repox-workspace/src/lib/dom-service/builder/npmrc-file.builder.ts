import {singleton} from "tsyringe";

import {WorkspaceStructureAbstractBuilder} from "./workspace-structure-abstract.builder";
import {WorkspaceDomainStore} from "@lib/repox-workspace";

@singleton()
/**
 * Create .npmrc file.
 */
export class NpmrcFileBuilder extends WorkspaceStructureAbstractBuilder {
    constructor(private readonly workspaceDomain: WorkspaceDomainStore) {
        super();
    }

    generate() {
        if (this.workspaceDomain.workspaceDomain) {
            this.workspaceDomain.workspaceDomain.npmRcTextDomain = "";
        }
    }

    regenerate() {
    }
}
