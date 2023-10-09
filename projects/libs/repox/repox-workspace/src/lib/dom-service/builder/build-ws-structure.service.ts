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
                value: WorkspaceFileEnum.gitignoreTextFile,
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
                value: WorkspaceFileEnum.gitignoreTextFile,
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
                value: WorkspaceFileEnum.gitkeepTextFile,
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
      /**
       * Generate default jest.config.js file. It replaces the current configuration.
       */
      {
        type: WsStructureEnum.createJestConfigJsFile,
        value: EMPTY_STRING,
        children: []
      },
      /**
       * Generate default repox.json file. It replaces the current configuration.
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
