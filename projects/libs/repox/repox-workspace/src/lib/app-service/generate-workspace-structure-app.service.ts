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
    private path: string = EMPTY_STRING;

    generate(): boolean {
        this.path = EMPTY_STRING;
        return this.runGenerate(WORKSPACE_STRUCTURE.structure);
    }

    private runGenerate(actions: WorkspaceStructureActionsModel[]): boolean {
        for (const action of actions) {
            switch (action.action) {
                case WorkspaceActionEnum.createFolder:
                    if (!this.createFolder(action)) return false;
                    break;
                case WorkspaceActionEnum.createFile:
                    if (!this.createFile(action)) return false;
                    break;
                default:
                    throw new Error("Not supported generate action!");
            }
        }
        this.path = createParentPath(this.path);
        return true;
    }

    private createFolder(action: WorkspaceStructureCreateFolderModel): boolean {
        this.path = createPath(this.path, action.folderName);
        if (pathNotExist(this.path)) createFolder(this.path);
        if (action.subFolders.length > 0) this.runGenerate(action.subFolders);
        return true;
    }

    private createFile(action: WorkspaceStructureCreateFileModel): boolean {
        this.path = createPath(this.path, action.fileName);
        writeToFile(this.path, action.fileContent);
        this.path = createParentPath(this.path);
        return true;
    }
}

// todo: done