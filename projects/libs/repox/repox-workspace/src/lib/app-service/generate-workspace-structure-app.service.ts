import {singleton} from "tsyringe";

import {
    WorkspaceStructureActionsModel,
    WorkspaceStructureCreateFileModel,
    WorkspaceStructureCreateFolderModel
} from "../model/workspace/workspace-structure.model";
import {WORKSPACE_STRUCTURE} from "../const/workspace-structure.const";
import {WorkspaceActionEnum} from "../enum/workspace/workspace-action.enum";
import {EMPTY_STRING} from "@lib/const";
import {createFolder, createParentPath, createPath, pathNotExist, writeToFile} from "@lib/utils";

@singleton()
/**
 * The service uses recursion to generate workspace.
 */
export class GenerateWorkspaceStructureAppService {
    generate(): boolean {
        return this.runGenerate(WORKSPACE_STRUCTURE.structure, EMPTY_STRING);
    }

    private runGenerate(actions: WorkspaceStructureActionsModel[], path: string): boolean {
        for (const action of actions) {
            switch (action.action) {
                case WorkspaceActionEnum.createFolder:
                    if (!this.createFolder(action, path)) return false;
                    break;
                case WorkspaceActionEnum.createFile:
                    if (!this.createFile(action, path)) return false;
                    break;
                default:
                    throw new Error("Not supported generate action!");
            }
        }
        path = createParentPath(path);
        return true;
    }

    private createFolder(action: WorkspaceStructureCreateFolderModel, path: string): boolean {
        path = createPath(path, action.folderName);
        if (pathNotExist(path)) createFolder(path);
        if (action.subFolders.length > 0) this.runGenerate(action.subFolders, path);
        return true;
    }

    private createFile(action: WorkspaceStructureCreateFileModel, path: string): boolean {
        path = createPath(path, action.fileName);
        writeToFile(path, action.fileContent);
        path = createParentPath(path);
        return true;
    }
}

// todo: done