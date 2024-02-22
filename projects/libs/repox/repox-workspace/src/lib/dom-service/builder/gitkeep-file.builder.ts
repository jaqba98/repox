import {singleton} from "tsyringe";

import {
    existPath,
    isEmptyFolder,
    isManyFilesInFolder,
    removeFile,
    writeToFile
} from "@lib/utils";

import {WorkspaceStructureAbstractBuilder} from "./workspace-structure-abstract.builder";
import {WorkspaceFileEnum} from "../../enum/workspace-file.enum";

@singleton()
/**
 * Create .gitkeep file.
 */
export class GitkeepFileBuilder extends WorkspaceStructureAbstractBuilder {
    generate() {
        this.createGitKeepFile();
    }

    regenerate() {
        this.createGitKeepFile();
    }

    private createGitKeepFile() {
        const emptyFolder = isEmptyFolder(".");
        const fileExist = existPath(WorkspaceFileEnum.gitkeep);
        if (!emptyFolder && !fileExist) return;
        if (!emptyFolder && fileExist) {
            if (isManyFilesInFolder(".")) removeFile(WorkspaceFileEnum.gitkeep);
            return;
        }
        if (emptyFolder && !fileExist) writeToFile(WorkspaceFileEnum.gitkeep, "");
    }
}
