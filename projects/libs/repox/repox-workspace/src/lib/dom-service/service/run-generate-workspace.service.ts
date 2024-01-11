import {singleton} from "tsyringe";

import {
    WorkspaceStructureActionsModel,
    WorkspaceStructureCreateFileModel,
    WorkspaceStructureCreateFolderModel,
    WorkspaceStructureRunCommandModel
} from "../../model/workspace/workspace-structure.model";
import {createFolder, createPath, pathNotExist, runCommand, writeToFile} from "@lib/utils";
import {WorkspaceActionEnum} from "../../enum/workspace/workspace-action.enum";

@singleton()
/**
 * The service uses recursion to generate workspace.
 */
export class RunGenerateWorkspaceService {
    run(actions: WorkspaceStructureActionsModel[], currentPath: string, workspaceName: string): boolean {
        for (const action of actions) {
            switch (action.action) {
                case WorkspaceActionEnum.createFolder:
                    if (!this.createFolder(action, currentPath, workspaceName)) return false;
                    break;
                case WorkspaceActionEnum.createFile:
                    if (!this.createFile(action, currentPath, workspaceName)) return false;
                    break;
                case WorkspaceActionEnum.runCommand:
                    if (!this.runCommand(action, currentPath)) return false;
                    break;
                default:
                    throw new Error("Not supported generate action!");
            }
        }
        return true;
    }

    private createFolder(
        action: WorkspaceStructureCreateFolderModel,
        currentPath: string,
        workspaceName: string
    ): boolean {
        const folderPath = createPath(currentPath, action.folderName);
        if (pathNotExist(folderPath)) createFolder(folderPath);
        if (action.subFolders.length > 0) this.run(action.subFolders, folderPath, workspaceName);
        return true;
    }

    private createFile(
        action: WorkspaceStructureCreateFileModel,
        currentPath: string,
        workspaceName: string
    ): boolean {
        const filePath = createPath(currentPath, action.fileName);
        if (action.contentBuilder.checkBeforeBuildContent(filePath)) {
            const fileContent = action.contentBuilder.buildContent(workspaceName);
            writeToFile(filePath, fileContent);
        }
        return true;
    }

    private runCommand(action: WorkspaceStructureRunCommandModel, currentPath: string): boolean {
        runCommand(action.command, currentPath);
        return true;
    }
}

// todo: done