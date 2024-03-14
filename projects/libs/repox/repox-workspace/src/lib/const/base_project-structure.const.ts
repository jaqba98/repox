import {WorkspaceStructureModel} from "../model/workspace/workspace-structure.model";
import {WorkspaceFolderEnum} from "../enum/workspace-folder.enum";
import {SrcFolderBuilder} from "../dom-service/builder/src-folder.builder";
import {AppTsMainFileBuilder} from "../dom-service/builder/app-ts-main-file.builder";

/**
 * The contestant contains the whole workspace structure to generate.
 */
export const APP_TYPESCRIPT_PROJECT_STRUCTURE: WorkspaceStructureModel = {
    structure: [
        {
            path: WorkspaceFolderEnum.src,
            builder: SrcFolderBuilder,
            children: [
                {
                    path: ".",
                    builder: AppTsMainFileBuilder,
                    children: []
                }
            ]
        }
    ]
};
