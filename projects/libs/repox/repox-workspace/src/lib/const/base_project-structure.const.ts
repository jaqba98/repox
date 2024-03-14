import {WorkspaceStructureModel} from "../model/workspace/workspace-structure.model";
import {WorkspaceFolderEnum} from "../enum/workspace-folder.enum";
import {SrcFolderBuilder} from "../dom-service/builder/src-folder.builder";
import {LibFolderBuilder} from "../dom-service/builder/lib-folder.builder";
import {GitkeepFileBuilder} from "../dom-service/builder/gitkeep-file.builder";

/**
 * The contestant contains the whole workspace structure to generate.
 */
export const BASE_PROJECT_STRUCTURE: WorkspaceStructureModel = {
    structure: [
        {
            path: WorkspaceFolderEnum.src,
            builder: SrcFolderBuilder,
            children: [
                {
                    path: WorkspaceFolderEnum.lib,
                    builder: LibFolderBuilder,
                    children: [
                        {
                            path: ".",
                            builder: GitkeepFileBuilder,
                            children: []
                        }
                    ]
                }
            ]
        }
    ]
};
