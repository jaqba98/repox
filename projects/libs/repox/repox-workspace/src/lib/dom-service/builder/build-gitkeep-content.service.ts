import {singleton} from "tsyringe";

import {EMPTY_STRING} from "@lib/const";
import {WorkspaceContentBuilderModel} from "../../model/workspace/workspace-content-builder.model";
import {createParentPath, isEmptyFolder, pathNotExist} from "@lib/utils";

@singleton()
/**
 * The service is responsible for building an empty file content.
 */
export class BuildGitkeepContentService implements WorkspaceContentBuilderModel {
    condition(path: string): boolean {
        const parentPath = createParentPath(path);
        if (pathNotExist(parentPath)) return false;
        return isEmptyFolder(parentPath);
    }

    build(): string {
        return EMPTY_STRING;
    }
}

// todo: done