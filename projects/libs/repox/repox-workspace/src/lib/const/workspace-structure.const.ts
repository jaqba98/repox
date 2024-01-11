import {container} from "tsyringe";

import {WorkspaceStructureModel} from "../model/workspace/workspace-structure.model";
import {WorkspaceActionEnum} from "../enum/workspace/workspace-action.enum";
import {WorkspaceFolderEnum} from "../enum/workspace/workspace-folder.enum";
import {WorkspaceFileEnum} from "../enum/workspace/workspace-file.enum";
import {BuildGitkeepContentService} from "../dom-service/builder/build-gitkeep-content.service";
import {BuildRepoxJsonContentService} from "../dom-service/builder/build-repox-json-content.service";
import {BuildTsconfigJsonContentService} from "../dom-service/builder/build-tsconfig-json-content.service";
import {BuildRootPackageJsonContentService} from "../dom-service/builder/build-root-package-json-content.service";
import {BuildJestConfigTsContentService} from "../dom-service/builder/build-jest-config-ts-content.service";
import {BuildGitignoreContentService} from "../dom-service/builder/build-gitignore-content.service";
import {BuildEslintrcTsContentService} from "../dom-service/builder/build-eslintrc-ts-content.service";

/**
 * The contestant contains the whole workspace structure to generate.
 */
export const WORKSPACE_STRUCTURE: WorkspaceStructureModel = {
    structure: [
        {
            action: WorkspaceActionEnum.createFolder,
            folderName: WorkspaceFolderEnum.projects,
            subFolders: [
                {
                    action: WorkspaceActionEnum.createFolder,
                    folderName: WorkspaceFolderEnum.apps,
                    subFolders: [
                        {
                            action: WorkspaceActionEnum.createFile,
                            fileName: WorkspaceFileEnum.gitKeep,
                            contentBuilder: container.resolve(BuildGitkeepContentService)
                        }
                    ]
                },
                {
                    action: WorkspaceActionEnum.createFolder,
                    folderName: WorkspaceFolderEnum.libs,
                    subFolders: [
                        {
                            action: WorkspaceActionEnum.createFile,
                            fileName: WorkspaceFileEnum.gitKeep,
                            contentBuilder: container.resolve(BuildGitkeepContentService)
                        }
                    ]
                },
                {
                    action: WorkspaceActionEnum.createFolder,
                    folderName: WorkspaceFolderEnum.tools,
                    subFolders: [
                        {
                            action: WorkspaceActionEnum.createFile,
                            fileName: WorkspaceFileEnum.gitKeep,
                            contentBuilder: container.resolve(BuildGitkeepContentService)
                        }
                    ]
                }
            ]
        },
        {
            action: WorkspaceActionEnum.createFile,
            fileName: WorkspaceFileEnum.eslintrcTs,
            contentBuilder: container.resolve(BuildEslintrcTsContentService)
        },
        {
            action: WorkspaceActionEnum.createFile,
            fileName: WorkspaceFileEnum.gitignore,
            contentBuilder: container.resolve(BuildGitignoreContentService)
        },
        {
            action: WorkspaceActionEnum.createFile,
            fileName: WorkspaceFileEnum.jestConfigTs,
            contentBuilder: container.resolve(BuildJestConfigTsContentService)
        },
        {
            action: WorkspaceActionEnum.createFile,
            fileName: WorkspaceFileEnum.packageJson,
            contentBuilder: container.resolve(BuildRootPackageJsonContentService)
        },
        {
            action: WorkspaceActionEnum.createFile,
            fileName: WorkspaceFileEnum.repoxJson,
            contentBuilder: container.resolve(BuildRepoxJsonContentService)
        },
        {
            action: WorkspaceActionEnum.createFile,
            fileName: WorkspaceFileEnum.tsconfigJson,
            contentBuilder: container.resolve(BuildTsconfigJsonContentService)
        }
    ]
};

// todo: done