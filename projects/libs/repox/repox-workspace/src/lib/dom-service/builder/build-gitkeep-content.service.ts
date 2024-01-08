import {singleton} from "tsyringe";

import {EMPTY_STRING} from "@lib/const";
import {WorkspaceContentBuilderModel} from "../../model/workspace/workspace-content-builder.model";
import {createParentPath, isEmptyFolder, oneFileInFolder, pathExist, pathNotExist, removeFile} from "@lib/utils";

@singleton()
/**
 * The service is responsible for building the .gitkeep content file.
 */
export class BuildGitkeepContentService implements WorkspaceContentBuilderModel {
    checkBeforeBuildContent(path: string): boolean {
        const parentPath = createParentPath(path);
        if (pathNotExist(parentPath)) return false;
        if (isEmptyFolder(parentPath)) return true;
        if (oneFileInFolder(parentPath) && pathExist(path)) {
            removeFile(path);
            return true;
        }
        return false;
    }

    buildContent(): string {
        return EMPTY_STRING;
    }
}

// todo: done