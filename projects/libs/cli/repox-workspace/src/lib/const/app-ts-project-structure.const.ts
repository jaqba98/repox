import { type WorkspaceStructureModel } from "../model/workspace/workspace-structure.model";
import { WorkspaceFolderEnum } from "../enum/workspace-folder.enum";
import { SrcFolderBuilder } from "../dom-service/builder/src-folder.builder";
import { AppFolderBuilder } from "../dom-service/builder/app-folder.builder";
import { ProjectPackageJsonFileBuilder } from "../dom-service/builder/project-package-json-file.builder";
import { MainTsFileBuilder } from "../dom-service/builder/main-ts-file.builder";

/**
 * The contestant contains the app ts project structure to generate.
 */
export const APP_TS_PROJECT_STRUCTURE: WorkspaceStructureModel = {
    structure: [
        {
            path: WorkspaceFolderEnum.src,
            builder: SrcFolderBuilder,
            children: [
                {
                    path: WorkspaceFolderEnum.app,
                    builder: AppFolderBuilder,
                    children: [
                        {
                            path: ".",
                            builder: MainTsFileBuilder,
                            children: []
                        }
                    ]
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
