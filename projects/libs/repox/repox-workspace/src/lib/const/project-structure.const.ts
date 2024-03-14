import {WorkspaceStructureModel} from "../model/workspace/workspace-structure.model";
import {WorkspaceFolderEnum} from "../enum/workspace-folder.enum";
import {SrcFolderBuilder} from "../dom-service/builder/src-folder.builder";
import {LibFolderBuilder} from "../dom-service/builder/lib-folder.builder";
import {
    ProjectMainFileBuilder
} from "../dom-service/builder/project-main-file.builder";
import {ProjectIndexFileBuilder} from "../dom-service/builder/project-index-file.builder";
import {
    ProjectPackageJsonFileBuilder
} from "../dom-service/builder/project-package-json-file.builder";

/**
 * The contestant contains the whole workspace structure to generate.
 */
export const PROJECT_STRUCTURE: WorkspaceStructureModel = {
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
                            builder: ProjectMainFileBuilder,
                            children: []
                        }
                    ]
                },
                {
                    path: ".",
                    builder: ProjectIndexFileBuilder,
                    children: []
                }
            ]
        },
        {
            path: ".",
            builder: ProjectPackageJsonFileBuilder,
            children: []
        }
    ]
};
