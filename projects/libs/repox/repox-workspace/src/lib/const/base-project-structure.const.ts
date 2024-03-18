import {WorkspaceStructureModel} from "../model/workspace/workspace-structure.model";
import {WorkspaceFolderEnum} from "../enum/workspace-folder.enum";
import {SrcFolderBuilder} from "../dom-service/builder/src-folder.builder";
import {GitkeepFileBuilder} from "../dom-service/builder/gitkeep-file.builder";

/**
 * The contestant contains the base project structure to generate.
 */
export const BASE_PROJECT_STRUCTURE: WorkspaceStructureModel = {
    structure: [
        {
            path: WorkspaceFolderEnum.src,
            builder: SrcFolderBuilder,
            children: [
                {
                    path: ".",
                    builder: GitkeepFileBuilder,
                    children: []
                }
            ]
        }
    ]
};
