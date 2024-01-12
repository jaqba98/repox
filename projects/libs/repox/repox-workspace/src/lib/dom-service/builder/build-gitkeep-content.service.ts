import {singleton} from "tsyringe";

import {EMPTY_STRING} from "@lib/const";
import {WorkspaceContentBuilderModel} from "../../model/workspace/workspace-content-builder.model";
import {
    createParentPath,
    isEmptyFolder,
    manyFilesInFolder,
    oneFileInFolder,
    pathExist,
    pathNotExist,
    removeFile
} from "@lib/utils";
import {SystemProgramEnum, SystemProgramExistService} from "@lib/program-step";

@singleton()
/**
 * The service is responsible for building the .gitkeep content file.
 */
export class BuildGitkeepContentService implements WorkspaceContentBuilderModel {
    constructor(private readonly systemProgramExist: SystemProgramExistService) {
    }

    checkBeforeBuildContent(path: string): boolean {
        const parentPath = createParentPath(path);
        if (pathNotExist(parentPath)) return false;
        if (isEmptyFolder(parentPath)) {
            return this.systemProgramExist.checkExist(SystemProgramEnum.git);
        }
        if (oneFileInFolder(parentPath) && pathExist(path)) {
            removeFile(path);
            return this.systemProgramExist.checkExist(SystemProgramEnum.git);
        }
        if (manyFilesInFolder(parentPath) && pathExist(path)) removeFile(path);
        return false;
    }

    buildContent(): string {
        return EMPTY_STRING;
    }
}


// todo: refactor the code
