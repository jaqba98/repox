import {singleton} from "tsyringe";
import {WorkspaceDomainStore} from "@lib/repox-workspace";

import {WorkspaceStructureAbstractBuilder} from "./workspace-structure-abstract.builder";

@singleton()
/**
 * Create repox.json file.
 */
export class RepoxJsonFileBuilder extends WorkspaceStructureAbstractBuilder {
    constructor(private readonly workspaceDomain: WorkspaceDomainStore) {
        super();
    }

    generate() {
        if (this.workspaceDomain.workspaceDomain) {
            this.workspaceDomain.workspaceDomain.repoxJsonDomain = {
                projects: {}
            };
        }
    }

    regenerate() {
    }
}
