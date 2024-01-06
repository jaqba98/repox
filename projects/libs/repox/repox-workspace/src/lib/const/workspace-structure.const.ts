import {WorkspaceStructureModel} from "../model/workspace/workspace-structure.model";
import {WorkspaceActionEnum} from "../enum/workspace/workspace-action.enum";
import {WorkspaceFileEnum, WorkspaceFolderEnum} from "@lib/repox-workspace";
import {EMPTY_STRING} from "@lib/const";

/**
 * The contestant contains the whole workspace structure to generate.
 */
export const WORKSPACE_STRUCTURE: WorkspaceStructureModel = {
    structure: [
        {
            action: WorkspaceActionEnum.createFolder,
            folderName: WorkspaceFolderEnum.projects,
            subFolders: [
                {
                    action: WorkspaceActionEnum.createFolder,
                    folderName: WorkspaceFolderEnum.apps,
                    subFolders: [
                        {
                            action: WorkspaceActionEnum.createFile,
                            fileName: WorkspaceFileEnum.gitKeep,
                            fileContent: EMPTY_STRING
                        }
                    ]
                },
                {
                    action: WorkspaceActionEnum.createFolder,
                    folderName: WorkspaceFolderEnum.libs,
                    subFolders: [
                        {
                            action: WorkspaceActionEnum.createFile,
                            fileName: WorkspaceFileEnum.gitKeep,
                            fileContent: EMPTY_STRING
                        }
                    ]
                },
                {
                    action: WorkspaceActionEnum.createFolder,
                    folderName: WorkspaceFolderEnum.tools,
                    subFolders: [
                        {
                            action: WorkspaceActionEnum.createFile,
                            fileName: WorkspaceFileEnum.gitKeep,
                            fileContent: EMPTY_STRING
                        }
                    ]
                }
            ]
        }
    ]
};

// todo: done