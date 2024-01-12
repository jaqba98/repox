import {singleton} from "tsyringe";

import {WorkspaceContentBuilderModel} from "../../model/workspace/workspace-content-builder.model";
import {EMPTY_STRING} from "@lib/const";

@singleton()
/**
 * The service is responsible for building the jest.config.ts content file.
 */
export class BuildJestConfigTsContentService implements WorkspaceContentBuilderModel {
    checkBeforeBuildContent(_path: string): boolean {
        return true;
    }

    buildContent(): string {
        return EMPTY_STRING;
    }
}


// todo: refactor the code
