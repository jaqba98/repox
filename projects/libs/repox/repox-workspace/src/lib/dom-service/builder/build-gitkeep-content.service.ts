import {singleton} from "tsyringe";

import {EMPTY_STRING} from "@lib/const";
import {WorkspaceContentBuilderModel} from "../../model/workspace/workspace-content-builder.model";
import {isEmptyFolder, pathNotExist} from "@lib/utils";

@singleton()
/**
 * The service is responsible for building an empty file content.
 */
export class BuildGitkeepContentService implements WorkspaceContentBuilderModel {
    condition(path: string): boolean {
        if (pathNotExist(path)) return false;
        return isEmptyFolder(path);
    }

    build(): string {
        return EMPTY_STRING;
    }
}

// todo: done