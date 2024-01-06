import {WorkspaceActionEnum} from "../../enum/workspace/workspace-action.enum";
import {WorkspaceFileEnum, WorkspaceFolderEnum} from "@lib/repox-workspace";
import {WorkspaceContentBuilderModel} from "./workspace-content-builder.model";

export interface WorkspaceStructureCreateFolderModel {
    action: WorkspaceActionEnum.createFolder;
    folderName: WorkspaceFolderEnum;
    subFolders: WorkspaceStructureActionsModel[];
}

export interface WorkspaceStructureCreateFileModel {
    action: WorkspaceActionEnum.createFile;
    fileName: WorkspaceFileEnum;
    contentBuilder: WorkspaceContentBuilderModel;
}

export type WorkspaceStructureActionsModel = WorkspaceStructureCreateFolderModel | WorkspaceStructureCreateFileModel;

export interface WorkspaceStructureModel {
    structure: WorkspaceStructureActionsModel[];
}

// todo: done