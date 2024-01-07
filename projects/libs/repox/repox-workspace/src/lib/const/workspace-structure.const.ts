import {WorkspaceStructureModel} from "../model/workspace/workspace-structure.model";
import {WorkspaceActionEnum} from "../enum/workspace/workspace-action.enum";
import {WorkspaceFolderEnum} from "../enum/workspace/workspace-folder.enum";
import {WorkspaceFileEnum} from "../enum/workspace/workspace-file.enum";
import {container} from "tsyringe";
import {BuildGitkeepContentService} from "../dom-service/builder/build-gitkeep-content.service";

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
                            contentBuilder: container.resolve(BuildGitkeepContentService)
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
                            contentBuilder: container.resolve(BuildGitkeepContentService)
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
                            contentBuilder: container.resolve(BuildGitkeepContentService)
                        }
                    ]
                }
            ]
        }
    ]
};

// todo: done