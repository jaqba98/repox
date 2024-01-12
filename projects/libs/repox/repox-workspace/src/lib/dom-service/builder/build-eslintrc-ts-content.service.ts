import {singleton} from "tsyringe";

import {WorkspaceContentBuilderModel} from "../../model/workspace/workspace-content-builder.model";
import {EMPTY_STRING} from "@lib/const";

@singleton()
/**
 * The service is responsible for building the .eslintrc.ts content file.
 */
export class BuildEslintrcTsContentService implements WorkspaceContentBuilderModel {
    checkBeforeBuildContent(_path: string): boolean {
        return true;
    }

    buildContent(): string {
        return EMPTY_STRING;
    }
}

