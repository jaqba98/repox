import {singleton} from "tsyringe";

import {WorkspaceDomainPartialModel} from "../../model/workspace/workspace-domain.model";
import {WorkspaceDtoStore} from "./workspace-dto.store";

@singleton()
/**
 * The store of workspace domain model.
 */
export class WorkspaceDomainStore {
    private workspaceDomain: WorkspaceDomainPartialModel = {};

    constructor(private readonly store: WorkspaceDtoStore) {
    }

    build(): void {
        this.workspaceDomain = {
            gitignoreTextDomain: this.store.gitignoreTextDto,
            npmRcTextDomain: this.store.npmRcTextDto,
            readmeMdTextDomain: this.store.readmeMdTextDto
        };
    }
}
