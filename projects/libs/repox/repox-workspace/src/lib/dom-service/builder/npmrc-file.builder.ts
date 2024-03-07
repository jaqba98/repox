import {singleton} from "tsyringe";

import {WorkspaceStructureAbstractBuilder} from "./workspace-structure-abstract.builder";
import { WorkspaceDomainStore } from "../store/workspace-domain.store";

@singleton()
/**
 * Create .npmrc file.
 */
export class NpmrcFileBuilder extends WorkspaceStructureAbstractBuilder {
    constructor(private readonly store: WorkspaceDomainStore) {
        super();
    }

    generate() {
        if (this.store.workspaceDomain) {
            this.store.workspaceDomain.npmRcTextDomain = "";
        }
    }

    regenerate() {
    }
}
