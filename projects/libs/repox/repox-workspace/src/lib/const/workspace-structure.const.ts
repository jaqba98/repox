import {WorkspaceStructureModel} from "../model/workspace/workspace-structure.model";
import {ProjectsFolderBuilder} from "../dom-service/builder/projects-folder.builder";
import {AppsFolderBuilder} from "../dom-service/builder/apps-folder.builder";
import {LibsFolderBuilder} from "../dom-service/builder/libs-folder.builder";
import {ToolsFolderBuilder} from "../dom-service/builder/tools-folder.builder";
import {WorkspaceFolderEnum} from "../enum/workspace-folder.enum";
import {GitkeepFileBuilder} from "../dom-service/builder/gitkeep-file.builder";
import {RepoxJsonFileBuilder} from "../dom-service/builder/repox-json-file.builder";
import {
    RootPackageJsonFileBuilder
} from "../dom-service/builder/root-package-json-file.builder";
import {TsconfigJsonFileBuilder} from "../dom-service/builder/tsconfig-json-file.builder";
import {GitFolderBuilder} from "../dom-service/builder/git-folder.builder";
import {GitignoreFileBuilder} from "../dom-service/builder/gitignore-file.builder";

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
                            path: WorkspaceFolderEnum.current,
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
                            path: WorkspaceFolderEnum.current,
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
                            path: WorkspaceFolderEnum.current,
                            builder: GitkeepFileBuilder,
                            children: []
                        }
                    ]
                }
            ]
        },
        {
            path: WorkspaceFolderEnum.current,
            builder: RepoxJsonFileBuilder,
            children: []
        },
        {
            path: WorkspaceFolderEnum.current,
            builder: RootPackageJsonFileBuilder,
            children: []
        },
        {
            path: WorkspaceFolderEnum.current,
            builder: TsconfigJsonFileBuilder,
            children: []
        },
        {
            path: WorkspaceFolderEnum.current,
            builder: GitFolderBuilder,
            children: []
        },
        {
            path: WorkspaceFolderEnum.current,
            builder: GitignoreFileBuilder,
            children: []
        }
    ]
};
