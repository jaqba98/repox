import {WorkspaceStructureModel} from "../model/workspace/workspace-structure.model";
import {WorkspaceFolderEnum} from "../enum/workspace-folder.enum";
import {ProjectsFolderBuilder} from "../dom-service/builder/projects-folder.builder";
import {AppsFolderBuilder} from "../dom-service/builder/apps-folder.builder";
import {GitkeepFileBuilder} from "../dom-service/builder/gitkeep-file.builder";
import {LibsFolderBuilder} from "../dom-service/builder/libs-folder.builder";
import {ToolsFolderBuilder} from "../dom-service/builder/tools-folder.builder";
import {
    WorkspacePackageJsonFileBuilder
} from "../dom-service/builder/workspace-package-json-file.builder";

/**
 * The contestant contains the whole workspace structure to generate.
 */
export const WORKSPACE_STRUCTURE: WorkspaceStructureModel = {
    structure: [
        {
            path: WorkspaceFolderEnum.projects,
            builder: ProjectsFolderBuilder,
            children: [
                {
                    path: WorkspaceFolderEnum.apps,
                    builder: AppsFolderBuilder,
                    children: [
                        {
                            path: ".",
                            builder: GitkeepFileBuilder,
                            children: []
                        }
                    ]
                },
                {
                    path: WorkspaceFolderEnum.libs,
                    builder: LibsFolderBuilder,
                    children: [
                        {
                            path: ".",
                            builder: GitkeepFileBuilder,
                            children: []
                        }
                    ]
                },
                {
                    path: WorkspaceFolderEnum.tools,
                    builder: ToolsFolderBuilder,
                    children: [
                        {
                            path: ".",
                            builder: GitkeepFileBuilder,
                            children: []
                        }
                    ]
                }
            ]
        },
        {
            path: ".",
            builder: WorkspacePackageJsonFileBuilder,
            children: []
        },
        // {
        //     path: ".",
        //     builder: RepoxJsonFileBuilder,
        //     children: []
        // },
        // {
        //     path: ".",
        //     builder: TsconfigJsonFileBuilder,
        //     children: []
        // },
        // {
        //     path: ".",
        //     builder: GitignoreFileBuilder,
        //     children: []
        // },
        // {
        //     path: ".",
        //     builder: ReadmeFileBuilder,
        //     children: []
        // },
        // {
        //     path: ".",
        //     builder: NpmrcFileBuilder,
        //     children: []
        // }
    ]
};
