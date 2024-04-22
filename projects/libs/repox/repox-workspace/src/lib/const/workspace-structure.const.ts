// done
import { AppsFolderBuilder } from "../dom-service/builder/apps-folder.builder";
import { EslintrcJsFileBuilder } from "../dom-service/builder/eslintrc-js-file.builder";
import { GitignoreFileBuilder } from "../dom-service/builder/gitignore-file.builder";
import { GitkeepFileBuilder } from "../dom-service/builder/gitkeep-file.builder";
import { JestConfigJsFileBuilder } from "../dom-service/builder/jest-config-file.builder";
import { LibsFolderBuilder } from "../dom-service/builder/libs-folder.builder";
import { ProjectsFolderBuilder } from "../dom-service/builder/projects-folder.builder";
import { ReadmeFileBuilder } from "../dom-service/builder/readme-file.builder";
import { RepoxJsonFileBuilder } from "../dom-service/builder/repox-json-file.builder";
import { ToolsFolderBuilder } from "../dom-service/builder/tools-folder.builder";
import { TsconfigJsonFileBuilder } from "../dom-service/builder/tsconfig-json-file.builder";
import { WorkspacePackageJsonFileBuilder } from "../dom-service/builder/workspace-package-json-file.builder";
import { WorkspaceFolderEnum } from "../enum/workspace-folder.enum";
import { type WorkspaceStructureModel } from "../model/workspace/workspace-structure.model";

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
            builder: EslintrcJsFileBuilder,
            children: []
        },
        {
            path: ".",
            builder: GitignoreFileBuilder,
            children: []
        },
        {
            path: ".",
            builder: JestConfigJsFileBuilder,
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
        }
    ]
};
