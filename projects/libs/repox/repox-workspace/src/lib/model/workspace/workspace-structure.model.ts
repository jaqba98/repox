import {WorkspaceActionEnum} from "../../enum/workspace/workspace-action.enum";
import {WorkspaceFileEnum, WorkspaceFolderEnum} from "@lib/repox-workspace";

interface WorkspaceStructureCreateFolderModel {
    action: WorkspaceActionEnum.createFolder;
    folderName: WorkspaceFolderEnum;
    subFolders: WorkspaceStructureActionsModel[];
}

interface WorkspaceStructureCreateFileModel {
    action: WorkspaceActionEnum.createFile;
    fileName: WorkspaceFileEnum;
    fileContent: string;
}

export type WorkspaceStructureActionsModel = WorkspaceStructureCreateFolderModel | WorkspaceStructureCreateFileModel;

export interface WorkspaceStructureModel {
    structure: WorkspaceStructureActionsModel[];
}

// todo: done