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
import {RepoxJsonFileBuilder} from "../dom-service/builder/repox-json-file.builder";
import {TsconfigJsonFileBuilder} from "../dom-service/builder/tsconfig-json-file.builder";
import {GitignoreFileBuilder} from "../dom-service/builder/gitignore-file.builder";
import {ReadmeFileBuilder} from "../dom-service/builder/readme-file.builder";
import {NpmrcFileBuilder} from "../dom-service/builder/npmrc-file.builder";
import { EslintrcJsFileBuilder } from "../dom-service/builder/eslintrc-js-file.builder";

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
            builder: GitignoreFileBuilder,
            children: []
        },
        {
            path: ".",
            builder: NpmrcFileBuilder,
            children: []
        },
        {
            path: ".",
            builder: WorkspacePackageJsonFileBuilder,
            children: []
        },
        {
            path: ".",
            builder: ReadmeFileBuilder,
            children: []
        },
        {
            path: ".",
            builder: RepoxJsonFileBuilder,
            children: []
        },
        {
            path: ".",
            builder: TsconfigJsonFileBuilder,
            children: []
        },
        {
            path: ".",
            builder: EslintrcJsFileBuilder,
            children: []
        }
    ]
};
