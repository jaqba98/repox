import {singleton} from "tsyringe";

import {EMPTY_STRING} from "@lib/const";
import {WorkspaceContentBuilderModel} from "../../model/workspace/workspace-content-builder.model";

@singleton()
/**
 * The service is responsible for building an empty file content.
 */
export class BuildEmptyFileContentService implements WorkspaceContentBuilderModel {
    build(): string {
        return EMPTY_STRING;
    }
}

// todo: done