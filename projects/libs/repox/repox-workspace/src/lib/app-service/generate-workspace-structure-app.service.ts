import {singleton} from "tsyringe";

import {
    WorkspaceStructureActionsModel,
    WorkspaceStructureCreateFileModel,
    WorkspaceStructureCreateFolderModel
} from "../model/workspace/workspace-structure.model";
import {WORKSPACE_STRUCTURE} from "../const/workspace-structure.const";
import {WorkspaceActionEnum} from "../enum/workspace/workspace-action.enum";
import {EMPTY_STRING} from "@lib/const";
import {createFolder, createPath, pathNotExist, writeToFile} from "@lib/utils";

@singleton()
/**
 * The service uses recursion to generate workspace.
 */
export class GenerateWorkspaceStructureAppService {
    generate(): boolean {
        return this.runGenerate(WORKSPACE_STRUCTURE.structure, EMPTY_STRING);
    }

    // I am here
    private runGenerate(actions: WorkspaceStructureActionsModel[], currentPath: string): boolean {
        for (const action of actions) {
            switch (action.action) {
                case WorkspaceActionEnum.createFolder:
                    if (!this.createFolder(action, currentPath)) return false;
                    break;
                case WorkspaceActionEnum.createFile:
                    if (!this.createFile(action, currentPath)) return false;
                    break;
                default:
                    throw new Error("Not supported generate action!");
            }
        }
        return true;
    }

    private createFolder(action: WorkspaceStructureCreateFolderModel, currentPath: string): boolean {
        const folderPath = createPath(currentPath, action.folderName);
        if (pathNotExist(folderPath)) createFolder(folderPath);
        if (action.subFolders.length > 0) this.runGenerate(action.subFolders, folderPath);
        return true;
    }

    private createFile(action: WorkspaceStructureCreateFileModel, currentPath: string): boolean {
        const filePath = createPath(currentPath, action.fileName);
        writeToFile(filePath, action.contentBuilder.build());
        return true;
    }
}

// todo: done