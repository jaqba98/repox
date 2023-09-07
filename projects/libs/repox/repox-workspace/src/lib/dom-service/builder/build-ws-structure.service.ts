import { singleton } from "tsyringe";
import {
  WsStructureModel
} from "../../model/ws-structure/ws-structure.model";
import {
  WsStructureEnum
} from "../../enum/ws-structure/ws-structure.enum";
import {
  WorkspaceFolderEnum
} from "../../enum/workspace/workspace-folder.enum";
import { EMPTY_STRING } from "@lib/const";
import {
  WorkspaceFileEnum
} from "../../enum/workspace/workspace-file.enum";

@singleton()
/**
 * The service is responsible for creating
 * workspace structure to generate.
 */
export class BuildWsStructureService {
  buildStructure(): WsStructureModel[] {
    return [
      /**
       * Folder called projects with apps, libs and tools folders.
       * Each folder contains .gitkeep file if it is empty.
       * */
      {
        type: WsStructureEnum.createFolder,
        value: WorkspaceFolderEnum.projects,
        children: [
          {
            type: WsStructureEnum.createFolder,
            value: WorkspaceFolderEnum.apps,
            children: [
              {
                type: WsStructureEnum.createEmptyFileWhenFolderEmpty,
                value: WorkspaceFileEnum.gitkeep,
                children: []
              }
            ]
          },
          {
            type: WsStructureEnum.createFolder,
            value: WorkspaceFolderEnum.libs,
            children: [
              {
                type: WsStructureEnum.createEmptyFileWhenFolderEmpty,
                value: WorkspaceFileEnum.gitkeep,
                children: []
              }
            ]
          },
          {
            type: WsStructureEnum.createFolder,
            value: WorkspaceFolderEnum.tools,
            children: [
              {
                type: WsStructureEnum.createEmptyFileWhenFolderEmpty,
                value: WorkspaceFileEnum.gitkeep,
                children: []
              }
            ]
          }
        ]
      },
      /**
       * Generate correctly package.json file with all required npm.
       */
      {
        type: WsStructureEnum.createPackageJsonFile,
        value: EMPTY_STRING,
        children: [
          {
            type: WsStructureEnum.runCommand,
            value: `npm install`,
            children: []
          }
        ]
      },
      /**
       * Generate default .eslintrc.js file. It replaces the current configuration.
       */
      {
        type: WsStructureEnum.createEslintrcJsFile,
        value: EMPTY_STRING,
        children: []
      },
      /**
       * Generate default .gitignore file. It replaces the current configuration.
       */
      {
        type: WsStructureEnum.createGitignoreTextFile,
        value: EMPTY_STRING,
        children: []
      },
      // todo: I am here
      /**
       * Create jest.config.ts configuration in root of workspace.
       */
      {
        type: WsStructureEnum.createRootJestConfigTsFile,
        value: EMPTY_STRING,
        children: []
      },
      /**
       * Create repox.json file.
       */
      {
        type: WsStructureEnum.createRepoxJsonFile,
        value: EMPTY_STRING,
        children: []
      },
      /**
       * Create tsconfig.json file with filled path section for each
       * typescript library and tool project.
       */
      {
        type: WsStructureEnum.createTsconfigJsonFile,
        value: EMPTY_STRING,
        children: []
      }
    ];
  }
}
