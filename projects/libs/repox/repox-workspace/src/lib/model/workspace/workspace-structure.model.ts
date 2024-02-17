import {InjectionToken} from "tsyringe";

import {
    WorkspaceStructureAbstractBuilder
} from "../../dom-service/builder/workspace-structure-abstract.builder";
import {WorkspaceFolderEnum} from "../../enum/workspace-folder.enum";

/**
 * The model represent structure of workspace.
 */

export interface WorkspaceStructureBuilderModel {
    path: WorkspaceFolderEnum;
    builder: InjectionToken<WorkspaceStructureAbstractBuilder>;
    children: WorkspaceStructureBuilderModel[];
}

export interface WorkspaceStructureModel {
    structure: WorkspaceStructureBuilderModel[];
}
