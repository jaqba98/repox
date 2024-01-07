import {singleton} from "tsyringe";

import {EMPTY_STRING} from "@lib/const";
import {WorkspaceContentBuilderModel} from "../../model/workspace/workspace-content-builder.model";

@singleton()
/**
 * The service is responsible for building an empty file content.
 */
export class BuildGitkeepContentService implements WorkspaceContentBuilderModel {
    condition(_path: string): boolean {
        return true;
    }

    build(): string {
        return EMPTY_STRING;
    }
}

// todo: done